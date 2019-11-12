import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'src/services/dialog/dialog.service';
import { Drawing } from '../draw-area/i-drawing';

@Injectable({
    providedIn: 'root',
})
export class WebClientService {

    private readonly CUSTOM_URL: string = 'http://localhost:3000/draw';

    constructor(
        private dialogService: DialogService,
        private http: HttpClient) { }

    sendDrawing(drawing: Drawing) {
        const modal = this.dialogService.alertLoading(drawing.name);
        this.http.post(`${this.CUSTOM_URL}/add`, drawing)
            .subscribe(
                (response: Response) => {
                    modal.close();
                    const title = 'Drawing saved';
                    const content = 'Drawing has been saved online!';
                    this.dialogService.alertSuccess(title, content);
                },
                (error: HttpErrorResponse) => {
                    modal.close();
                    this.handleError(error);
                },
            );
    }

    addTag(id: string, tag: string): void {
        this.http.post(`${this.CUSTOM_URL}/addtag`, { id, tag })
            .subscribe(
                (error: HttpErrorResponse) => this.handleError(error),
            );
    }

    getAllDrawings(): Observable<any> {
        return this.http.get(`${this.CUSTOM_URL}/drawing/all`);
    }

    deleteDrawing(drawing: Drawing): void {
        this.http.delete(`${this.CUSTOM_URL}/drawing/delete/${drawing._id}`).subscribe(
            (error: HttpErrorResponse) => this.handleError(error),
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            const title = 'Connexion Error';
            const content = 'Could not connect to server.';
            this.dialogService.alertError(title, content);
        } else if (error.status === 500) {
            const title = 'Invalid drawing';
            const content = 'Server received an invalid drawing.';
            this.dialogService.alertError(title, content);
        }
    }
}
