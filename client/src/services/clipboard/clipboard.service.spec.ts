/*
    TODO:

import { HttpClientModule } from '@angular/common/http';
import { Renderer2 } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ClipboardService } from 'src/services/clipboard/clipboard.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { CmdService } from '../cmd/cmd.service';

describe('ClipboardService', () => {
    let service: ClipboardService;
    let renderer: Renderer2;
    let spyClipboard: any;
    let entry: any;
    let elem: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, MatSnackBarModule, HttpClientModule],
            // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [ClipboardService],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        spyClipboard = jasmine.createSpyObj('ClipboardService', ['copy', 'paste', 'cut']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        DOMRenderer.renderer = renderer;
        service = TestBed.get(ClipboardService);
        (service as any).clipboard = spyClipboard;
        elem = jasmine.createSpyObj('any', ['hasChildNodes', 'appendChild', 'removeChild', 'firstChild']);
        entry = jasmine.createSpyObj('ElementRef', ['nativeElement']);
        entry.nativeElement = elem;
        service.svg.entry = entry;
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should copy correctly', () => {
        service.copy();
        expect(service.offset).toEqual([0, 0]);
    });

    it('should cut correctly', () => {
        spyOn(service.selector, 'reset');
        service.cut();
        expect(service.selector.reset).toHaveBeenCalled();
        expect(service.offset).toEqual([0, 0]);
    });

    it('should paste correctly', () => {
        spyOn(CmdService, 'execute');
        service.paste();
        expect(CmdService.execute).toHaveBeenCalled();
    });
});
*/
