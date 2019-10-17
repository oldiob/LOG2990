import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../../../../common/communication/message';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Drawing } from 'src/utils/drawing';
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
  getDrawings() {
    return this
           .http
           .get(`${this.uri}`);
  }
  removeDrawing(Name: string) {
    return this
              .http
              .get(`${this.uri}/delete/${Name}`);
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

  sendDrawing() {
    const etiquette: string[] = ['abc', 'acd'];
    const drawing = new Drawing(etiquette, this.svgService.objects, 'name');
    console.log(this.svgService.entry.nativeElement);

    const result = new XMLSerializer().serializeToString(this.svgService.entry.nativeElement.cloneNode(true) as SVGElement);
    const parsed = new DOMParser().parseFromString(result, 'image/svg+xml');
    console.log(parsed.childNodes[0]);
    console.log(parsed);

    this.http.post(`${this.CUSTOM_URL}/addM`, result)
    .subscribe(res => console.log('Done'));
  }

  sendDrawingTest() {
    const svgElem = document.getElementsByTagName('app-draw-area')[0].childNodes[0];
    console.log(svgElem);
    this.http.post(`${this.CUSTOM_URL}/addTEST`, svgElem)
    .subscribe(res => console.log('Done'));
  }

  getDrawingTest(): Observable<any> {
    return this.http.get<any>(`${this.CUSTOM_URL}/getTest`).pipe(
      catchError(this.handleError<any>('basicGet')),
    );
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
