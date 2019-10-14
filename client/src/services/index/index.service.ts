import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Message} from '../../../../common/communication/message';
import { SVGService } from '../svg/svg.service';

@Injectable({
  providedIn: 'root',
})
export class IndexService {

  private readonly BASE_URL: string = 'http://localhost:3000/api/index';
  private readonly CUSTOM_URL: string = 'http://localhost:3000/draw/a';

  constructor(private http: HttpClient, private svgService: SVGService ) {
  }

  basicGet(): Observable<Message> {

    return this.http.get<Message>(this.BASE_URL).pipe(
      catchError(this.handleError<Message>('basicGet')),
    );
  }

  getSVGObjects(): Observable<Message> {

    return this.http.get<Message>(this.CUSTOM_URL).pipe(
      catchError(this.handleError<Message>('basicGet')),
    );
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}