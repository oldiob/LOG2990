import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SVGService} from 'src/services/svg/svg.service'
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

    constructor(private workZoneService: WorkZoneService,
        private http: HttpClient, private svgService: SVGService) {
      //
    }

    sendMessage() {
        // POST EXAMPLE DO NOT REMOVE CLIENTSIDE
        const drawResponse = new Message();
        drawResponse.title = 'hello';
        drawResponse.body = 'world';
        this.http.post(`${this.CUSTOM_URL}/addM`, drawResponse)
        .subscribe(res => console.log('Done'));
    }

    sendDrawing(drawing: Drawing) {
        this.saving = true;

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

        this.http.post(`${this.CUSTOM_URL}/add`, drawing)
        .subscribe(res => {
          this.saving = true;
        } );
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
        this.http.post(`${this.CUSTOM_URL}/drawing/bytags`, obj)
        .pipe(map((res: Response) => res));
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
        let drawings: Drawing[] = [];
        this.getAllDrawings().subscribe((savedDrawing: Drawing[]) => {
          drawings = savedDrawing;
          for ( let i = 0; i < drawings.length; i++) {
            const holder = JSON.parse(drawings[i].svgs).entry;
            const parsed = new DOMParser().parseFromString(holder, 'image/svg+xml');
            const svgEntry: SVGElement = parsed.childNodes[0] as SVGElement;
            drawings[i].thumbnail = svgEntry;
            }
          console.log('ABC', drawings);
          this.preparedDrawings = drawings;
          this.preparedReady = true;
          this.loading = false;
          return drawings;
        });
        return drawings;
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
