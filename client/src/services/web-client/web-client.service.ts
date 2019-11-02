import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomAlertComponent } from 'src/app/popups/custom-alert/custom-alert.component';
import { LoadDrawingComponent } from 'src/app/popups/load-drawing/load-drawing.component';
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
        this.saving = true;
        const loadingDialogRef = this.dialogService.openDialog(LoadDrawingComponent);
        loadingDialogRef.componentInstance.content = 'Saving Drawing';

        return this.http.post(`${this.CUSTOM_URL}/add`, drawing)
            .subscribe(
                (response: Response) => {
                    loadingDialogRef.close();
                    this.saving = false;
                    this.alertSuccess();
                },
                (error: HttpErrorResponse) => {
                    loadingDialogRef.close();
                    this.saving = false;
                    this.alertError(error);
                },
            );
    }

    private alertSuccess() {
        const snackRef = this.dialogService.openSnack(CustomAlertComponent);
        snackRef.instance.title = 'Drawing saved';
        snackRef.instance.content = 'Drawing has been saved online';
        snackRef.instance.isSuccess = true;
    }

    private alertError(error: HttpErrorResponse) {
        const snackRef = this.dialogService.openSnack(CustomAlertComponent);
        if (error.status === 0) {
            snackRef.instance.title = 'Connexion Error';
            snackRef.instance.content = 'Could not reach server';
            snackRef.instance.isError = true;
        } else if (error.status === 500) {
            snackRef.instance.title = 'Invalid drawing';
            snackRef.instance.content = 'Server denied saving the drawing';
            snackRef.instance.isError = true;
        }
    }

    addTag(id: number, tag: string) {
        this.http.post(`${this.CUSTOM_URL}/addtag`, { id, tag })
            .subscribe((res: Response) => {
                console.log(res.body);
            },
            (error) => {
                this.loading = false;
                const modalRef = this.dialogService.open(CustomAlertComponent);
                modalRef.componentInstance.data = 'Cannot reach server';
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
        const loadingDialogRef = this.dialogService.openDialog(LoadDrawingComponent);
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
        },
        (error) => {
            this.loading = false;
            const modalRef = this.dialogService.open(CustomAlertComponent);
            modalRef.componentInstance.data = 'Cannot reach server';
        });
        return drawings;
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
