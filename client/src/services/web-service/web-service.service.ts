import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebServiceService {

  uri = 'http://localhost:4000/draw';

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
}
