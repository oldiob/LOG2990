import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {MatDialogModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { LoadDrawingComponent } from 'src/app/popups/load-drawing/load-drawing.component';
import { Message } from '../../../../common/communication/message';
import { Drawing } from '../draw-area/i-drawing';
import { WebClientService } from './web-client.service';

describe('WebClientService', () => {
  let service: WebClientService;
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
              entryComponents: [LoadDrawingComponent],
            },
      });
    TestBed.configureTestingModule({
        declarations: [LoadDrawingComponent],
        imports: [HttpClientModule, MatDialogModule, BrowserAnimationsModule, BrowserDynamicTestingModule, RouterModule],
        providers: [WebClientService,
        {provide: HttpClient, useValue: httpClientSpy},
        ],
    }).compileComponents();
    service = TestBed.get(WebClientService);
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
    expect(service).toBeTruthy();
  });

  it('should get the drawing count', () => {
    service.loading = true;
    const expectedNumber = 8;
    httpClientSpy.get.and.returnValue(of(expectedNumber));
    service.getDrawingCount();
    expect(httpClientSpy.get.calls.count()).toEqual(CALL_COUNT);
  });

  it('should send drawing', () => {
    service.isDrawingValid(drawing);
    service.saving = true;
    httpClientSpy.post.and.returnValue(of(drawing));
    service.sendDrawing(drawing);
    expect(httpClientSpy.post.calls.count()).toEqual(CALL_COUNT);
  });

  it('should get all the drawing', () => {
    service.getAllDrawings();
    expect(httpClientSpy.get.calls.count()).toEqual(CALL_COUNT);
  });

  it('should get drawing by ID', () => {
    const id = 1;
    httpClientSpy.get.and.returnValue(of(id));
    service.getDrawingsByID(id);
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
    service.getDrawingsByTags(tags, min, max);
    expect(httpClientSpy.post.calls.count()).toEqual(CALL_COUNT);
  });

  it('should delete drawing', () => {
    const id = 1;
    httpClientSpy.delete.and.returnValue(of(id));
    service.deleteDrawing(id);
    expect(httpClientSpy.delete.calls.count()).toEqual(CALL_COUNT);
  });

  it('should get prepared drawing', () => {
    httpClientSpy.get.and.returnValue(of(message));
    service.getPreparedDrawing();
    let drawings: Drawing[] = [];
    service.getAllDrawings().subscribe((savedDrawing: Drawing[]) => {
      drawings = savedDrawing;
      service.preparedDrawings = drawings;
      service.preparedReady = true;
      service.loading = false;
      expect(savedDrawing).toEqual(drawings);
    });
    expect(service.getPreparedDrawing()).toEqual(drawings);
  });

  it('should return true if the drawing is valid', () => {
    service.isDrawingValid(drawing);
    expect(service.isDrawingValid(drawing)).toBeTruthy();
  });

  it('should return false if the drawing name is not valid', () => {
    let invalidName = new Drawing();
    invalidName = {
      id: 17,
      name: '',
      tags: ['allo'],
      holder: { entry: 'entry', elements: ['vide'] },
      backgroundColor: '#ffffff',
      width: 200,
      height: 200,
    };
    service.isDrawingValid(invalidName);
    expect(service.isDrawingValid(invalidName)).toBeFalsy();
  });

  it('should return false if the drawing tags is not valid', () => {
    let invalidTags = new Drawing();
    invalidTags = {
      id: 17,
      name: 'rebase',
      tags: ['123'],
      holder: { entry: 'entry', elements: ['vide'] },
      backgroundColor: '#ffffff',
      width: 200,
      height: 200,
    };
    service.isDrawingValid(invalidTags);
    expect(service.isDrawingValid(invalidTags)).toBeFalsy();
  });

});
