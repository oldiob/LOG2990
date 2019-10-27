import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomAlertComponent } from 'src/app/custom-alert/custom-alert.component';
import { LoadDrawingComponent } from 'src/app/load-drawing/load-drawing.component';
import { DialogService } from 'src/services/dialog/dialog.service';
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
        private http: HttpClient) { }

    sendDrawing(drawing: Drawing) {
        if (!this.isDrawingValid(drawing)) {
            const modalRef = this.dialogService.open(CustomAlertComponent);
            modalRef.componentInstance.data = 'Invalid drawing, not sending to server.';
            return;
        }
        this.saving = true;
        const loadingDialogRef = this.dialogService.open(LoadDrawingComponent);
        loadingDialogRef.componentInstance.data = 'Saving';

        return this.http.post(`${this.CUSTOM_URL}/add`, drawing)
            .subscribe((res: Response) => {
                if (res.status === 500) {
                    const modalRef = this.dialogService.open(CustomAlertComponent);
                    modalRef.componentInstance.data = 'Invalid drawing, server refused saving.';
                }
                this.saving = false;
                loadingDialogRef.componentInstance.done();
            });
    }

    addTag(id: number, tag: string) {
        this.http.post(`${this.CUSTOM_URL}/addtag`, { id, tag })
            .subscribe((res: Response) => {
                console.log(res.body);
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

    getPreparedDrawing(): Drawing[] {
        const loadingDialogRef = this.dialogService.open(LoadDrawingComponent);
        loadingDialogRef.componentInstance.data = 'Loading';
        let drawings: Drawing[] = [];
        this.getAllDrawings().subscribe((savedDrawing: Drawing[]) => {
            drawings = savedDrawing;
            console.log(drawings);
            this.preparedDrawings = drawings;
            this.preparedReady = true;
            this.loading = false;
            loadingDialogRef.componentInstance.done();
            return drawings;
        });
        return drawings;
    }

    isDrawingValid(drawing: Drawing): boolean {
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
