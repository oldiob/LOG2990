import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ClipboardService } from 'src/services/clipboard/clipboard.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { ClipboardOptionComponent } from './clipboard-option.component';

describe('ClipboardOptionComponent', () => {
    let component: ClipboardOptionComponent;
    let fixture: ComponentFixture<ClipboardOptionComponent>;
    let renderer: Renderer2;
    let spyClipboard: any;

    beforeEach(async(() => {
        spyClipboard = jasmine.createSpyObj('ClipboardService', ['copy', 'paste', 'cut']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
        DOMRenderer.renderer = renderer;
        TestBed.configureTestingModule({
            declarations: [ClipboardOptionComponent],
            imports: [MatDialogModule, MatSnackBarModule, HttpClientModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            providers: [ClipboardService],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClipboardOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        (component as any).clipboard = spyClipboard;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
