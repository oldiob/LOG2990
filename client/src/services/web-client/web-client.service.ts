import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomAlertComponent } from 'src/app/custom-alert/custom-alert.component';
import { LoadDrawingComponent } from 'src/app/load-drawing/load-drawing.component';
import { DialogService } from 'src/services/dialog/dialog.service';
import { SVGService } from 'src/services/svg/svg.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { Message } from '../../../../common/communication/message';
import { serializeDrawArea } from '../../utils/element-parser';
import { Drawing } from '../draw-area/i-drawing';

@Injectable({
    providedIn: 'root',
})
export class WebClientService {

    uri = 'http://localhost:4000/draw';
    private readonly CUSTOM_URL: string = 'http://localhost:3000/draw';
    preparedDrawings: Drawing[];
    preparedReady: boolean;
    saving = false;
    loading = false;

    constructor(
        private dialogService: DialogService,
        private workZoneService: WorkZoneService,
        private http: HttpClient,
        private svgService: SVGService) { }

    sendMessage() {
        // POST EXAMPLE DO NOT REMOVE CLIENTSIDE
        const drawResponse = new Message();
        drawResponse.title = 'hello';
        drawResponse.body = 'world';
        return this.http.post(`${this.CUSTOM_URL}/addM`, drawResponse)
            .subscribe((res: Response) => console.log(res.body));
    }

    sendDrawing(drawing: Drawing) {
        if (!this.isDrawingValid(drawing)) {
            const modalRef = this.dialogService.open(CustomAlertComponent);
            modalRef.componentInstance.data = 'Invalid drawing, not sending to server.';
            console.log('Invalid drawing, not sending to server.');
            return;
        }
        this.saving = true;
        const loadingDialogRef = this.dialogService.open(LoadDrawingComponent);
        loadingDialogRef.componentInstance.data = 'Saving';

        drawing.svgs = serializeDrawArea(this.svgService);
        this.workZoneService.currentHeight.subscribe(
            (height): number => {
                drawing.height = height;
                return height;
            },
        );
        this.workZoneService.currentWidth.subscribe(
            (width): number => {
                drawing.width = width;
                return width;
            },
        );
        this.workZoneService.currentBackgroundColor.subscribe(
            (color): string => {
                drawing.backgroundColor = color;
                return color;
            },
        );

        const result = new XMLSerializer().serializeToString(this.svgService.entry.nativeElement.cloneNode(true) as SVGElement);
        const parsed = new DOMParser().parseFromString(result, 'image/svg+xml');
        console.log(parsed.childNodes[0]);
        console.log(parsed);

        return this.http.post(`${this.CUSTOM_URL}/add`, drawing)
            .subscribe((res: Response) => {
                if (res.status === 500) {
                    const modalRef = this.dialogService.open(CustomAlertComponent);
                    modalRef.componentInstance.data = 'Invalid drawing, server refused saving.';
                    console.log('Invalid drawing, server refused saving.');
                }
                console.log(res.status);
                this.saving = false;
                //loadingDialogRef.close();
                loadingDialogRef.componentInstance.done();
            });
    }

    getDrawingCount(): Observable<number> {
        this.loading = true;
        return this.http.get<number>(`${this.CUSTOM_URL}/drawing/count`).pipe(
            catchError(this.handleError<number>('getDrawingCount')),
        );
    }
    getAllDrawings() {
        return this.http.get(`${this.CUSTOM_URL}/drawing/all`);
    }
    getDrawingsByID(id: number) {
        return this.http.get(`${this.CUSTOM_URL}/drawing/byid/${id}`);
    }
    getDrawingsByTags(tags: string[], min: number, max: number) {
        const obj: any = {
            tags,
            min,
            max,
        };
        return this.http.post(`${this.CUSTOM_URL}/drawing/bytags`, obj);
    }
    deleteDrawing(id: number) {
        return this.http.delete(`${this.CUSTOM_URL}/drawing/delete/${id}`);
    }

    getMessage(): Observable<Message> {
        // GET EXAMPLE DO NOT REMOVE CLIENTSIDE
        return this.http.get<Message>(`${this.CUSTOM_URL}/a`).pipe(
            catchError(this.handleError<Message>('basicGet')),
        );
    }

    getPreparedDrawing(): Drawing[] {
        const loadingDialogRef = this.dialogService.open(LoadDrawingComponent);
        loadingDialogRef.componentInstance.data = 'Loading';
        let drawings: Drawing[] = [];
        this.getAllDrawings().subscribe((savedDrawing: Drawing[]) => {
            drawings = savedDrawing;
            for (let i = 0; i < drawings.length; i++) {
                const holder = JSON.parse(drawings[i].svgs).entry;
                const parsed = new DOMParser().parseFromString(holder, 'image/svg+xml');
                const svgEntry: SVGElement = parsed.childNodes[0] as SVGElement;
                drawings[i].thumbnail = svgEntry;
            }
            this.preparedDrawings = drawings;
            this.preparedReady = true;
            this.loading = false;
            loadingDialogRef.componentInstance.done();
            return drawings;
        });
        return drawings;
    }

    private isDrawingValid(drawing: Drawing): boolean {
        if (drawing.name === '') {
            return false;
        }
        for (const tag of drawing.tags) {
            if (!(/^[a-zA-Z]+$/.test(tag))) {
                return false;
            }
        }
        return true;
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
