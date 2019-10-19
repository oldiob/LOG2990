import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Message } from '../../../../common/communication/message';

@Injectable({
  providedIn: 'root',
})
export class WebServiceService {

  uri = 'http://localhost:4000/draw';
  private readonly CUSTOM_URL: string = 'http://localhost:3000/draw';

  constructor(private http: HttpClient) {
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
        .subscribe(() => console.log('Done'));
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
      catchError(this.handleError<Message>()),
    );
  }

  sendMessage() {
    // POST EXAMPLE DO NOT REMOVE CLIENTSIDE
    const drawResponse = new Message();
    drawResponse.title = 'hello';
    drawResponse.body = 'world';
    this.http.post(`${this.CUSTOM_URL}/addM`, drawResponse)
    .subscribe(() => console.log('Done'));
  }

  sendDrawing() {
    const etiquette: string[] = ['abc', 'acd'];
    this.http.post(`${this.CUSTOM_URL}/addM`, etiquette)
    .subscribe(() => console.log('Done'));
  }

  sendDrawingTest() {
    const svgElem = document.getElementsByTagName('app-draw-area')[0].childNodes[0];
    console.log(svgElem);
    this.http.post(`${this.CUSTOM_URL}/addTEST`, svgElem)
    .subscribe(() => console.log('Done'));
  }

  getDrawingTest(): Observable<any> {
    return this.http.get<any>(`${this.CUSTOM_URL}/getTest`).pipe(
      catchError(this.handleError<any>()),
    );
  }

  private handleError<T>(result?: T): (error: Error) => Observable<T> {
    return (): Observable<T> => {
      return of(result as T);
    };
  }
}
