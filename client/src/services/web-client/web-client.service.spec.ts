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
            id: 17,

            name: 'test',
            tags: ['allo'],
            holder: { entry: 'entry', elements: ['vide'] },

            backgroundColor: '#ffffff',
            width: 200,
            height: 200,
        };
    });

    it('should be created', () => {
        expect(webClientService).toBeTruthy();
    });

    it('should get the drawing count', () => {
        webClientService.loading = true;
        const expectedNumber = 8;
        httpClientSpy.get.and.returnValue(of(expectedNumber));
        webClientService.getDrawingCount();
        expect(httpClientSpy.get.calls.count()).toEqual(CALL_COUNT);
    });

    it('should send drawing', () => {
        webClientService.saving = true;
        httpClientSpy.post.and.returnValue(of(drawing));
        webClientService.sendDrawing(drawing);
        expect(httpClientSpy.post.calls.count()).toEqual(CALL_COUNT);
    });

    it('should get all the drawing', () => {
        webClientService.getAllDrawings();
        expect(httpClientSpy.get.calls.count()).toEqual(CALL_COUNT);
    });

    it('should get drawing by ID', () => {
        const id = 1;
        httpClientSpy.get.and.returnValue(of(id));
        webClientService.getDrawingsByID(id);
        expect(httpClientSpy.get.calls.count()).toEqual(CALL_COUNT);
    });

    it('should get drawing by tags', () => {
        const tags = ['TestTags'];
        const min = 1;
        const max = 10;
        const obj = {
            tags,
            min,
            max,
        };
        httpClientSpy.post.and.returnValue(of(obj));
        webClientService.getDrawingsByTags(tags, min, max);
        expect(httpClientSpy.post.calls.count()).toEqual(CALL_COUNT);
    });

    it('should delete drawing', () => {
        const id = 1;
        httpClientSpy.delete.and.returnValue(of(id));
        webClientService.deleteDrawing(id);
        expect(httpClientSpy.delete.calls.count()).toEqual(CALL_COUNT);
    });

    it('should get prepared drawing', () => {
        httpClientSpy.get.and.returnValue(of(message));
        webClientService.getPreparedDrawing();
        let drawings: Drawing[] = [];
        webClientService.getAllDrawings().subscribe((savedDrawing: Drawing[]) => {
            drawings = savedDrawing;
            webClientService.preparedDrawings = drawings;
            webClientService.preparedReady = true;
            webClientService.loading = false;
            expect(savedDrawing).toEqual(drawings);
        });
        expect(webClientService.getPreparedDrawing()).toEqual(drawings);
    });

});
