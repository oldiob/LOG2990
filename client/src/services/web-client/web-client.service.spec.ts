import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { CustomAlertComponent } from 'src/app/popups/custom-alert/custom-alert.component';
import { LoadDrawingComponent } from 'src/app/popups/load-drawing/load-drawing.component';
import { Color } from 'src/utils/color';
import { Message } from '../../../../common/communication/message';
import { DialogService } from '../dialog/dialog.service';
import { Drawing } from '../draw-area/i-drawing';
import { WebClientService } from './web-client.service';

describe('WebClientService', () => {
    let webClientService: WebClientService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let drawing: Drawing;
    const CALL_COUNT = 1;
    const message: Message = {
        title: 'test',
        body: 'test',
    };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'delete']);
        httpClientSpy.post.and.returnValue(of(message));
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [LoadDrawingComponent, CustomAlertComponent],
            },
        });
        TestBed.configureTestingModule({
            declarations: [LoadDrawingComponent, CustomAlertComponent],
            imports: [
                HttpClientModule, MatDialogModule, MatSnackBarModule, BrowserAnimationsModule, BrowserDynamicTestingModule, RouterModule],
            providers: [WebClientService, DialogService,
                { provide: HttpClient, useValue: httpClientSpy },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
        webClientService = TestBed.get(WebClientService);
        drawing = {
            _id: '17',

            name: 'test',
            tags: ['allo'],
            holder: { entry: 'entry', elements: ['vide'] },

            backgroundColor: new Color(255, 255, 255, 1),
            width: 200,
            height: 200,
        };
    });

    it('should be created', () => {
        expect(webClientService).toBeTruthy();
    });

    it('should send drawing', () => {
        httpClientSpy.post.and.returnValue(of(drawing));
        webClientService.sendDrawing(drawing);
        expect(httpClientSpy.post.calls.count()).toEqual(CALL_COUNT);
    });

    it('should get all the drawing', () => {
        webClientService.getAllDrawings();
        expect(httpClientSpy.get.calls.count()).toEqual(CALL_COUNT);
    });

    it('should delete drawing', () => {
        const id = '17';
        httpClientSpy.delete.and.returnValue(of(id));
        webClientService.deleteDrawing(drawing);
        expect(httpClientSpy.delete.calls.count()).toEqual(CALL_COUNT);
    });

});
