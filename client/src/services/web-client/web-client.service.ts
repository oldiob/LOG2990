import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../../../../common/communication/message';
import { Observable, of, map } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Drawing } from '../draw-area/i-drawing';
import { SVGService} from 'src/services/svg/svg.service'

@Injectable({
  providedIn: 'root',
})
export class WebClientService {

  uri = 'http://localhost:4000/draw';
  private readonly CUSTOM_URL: string = 'http://localhost:3000/draw';

  constructor(private http: HttpClient, private svgService: SVGService) {
    //
   }

  addDrawing(Drawing: string, Name: string, Tags: string) {
    console.log(Drawing, Name, Tags);
    const obj = {
      Drawing,
      Name,
      Tags,
    };
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }
  getDrawingCount(): Observable<number> {
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

  sendMessage() {
    // POST EXAMPLE DO NOT REMOVE CLIENTSIDE
    const drawResponse = new Message();
    drawResponse.title = 'hello';
    drawResponse.body = 'world';
    this.http.post(`${this.CUSTOM_URL}/addM`, drawResponse)
    .subscribe(res => console.log('Done'));
  }

  sendDrawing(drawing: Drawing) {
    console.log(this.svgService.entry.nativeElement);

    const result = new XMLSerializer().serializeToString(this.svgService.entry.nativeElement.cloneNode(true) as SVGElement);
    const parsed = new DOMParser().parseFromString(result, 'image/svg+xml');
    console.log(parsed.childNodes[0]);
    console.log(parsed);

    this.http.post(`${this.CUSTOM_URL}/addM`, drawing)
    .subscribe(res => console.log('Done'));
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
