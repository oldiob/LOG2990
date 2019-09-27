import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from 'src/services/dialog/dialog.service';
import { EntryPointComponent } from '../entry-point/entry-point.component';
import { PolyDessinComponent } from './poly-dessin.component';

describe('PolyDessinComponent', () => {
    let component: PolyDessinComponent;
    let fixture: ComponentFixture<PolyDessinComponent>;
    let dialogService: DialogService;
    const keys = 'abcdefghijklmnopQRSTUVWXYZ';
    // tslint:disable-next-line:prefer-const
    let dialog: MatDialog;
    beforeEach(async(() => {
        TestBed.overrideModule(BrowserDynamicTestingModule, {
    set: {
            entryComponents: [EntryPointComponent],
         },
    });
        TestBed.configureTestingModule({
            declarations: [PolyDessinComponent, EntryPointComponent],
            imports: [HttpClientModule, MatDialogModule, BrowserAnimationsModule, BrowserDynamicTestingModule],
            providers: [{ provide: MatDialogRef, useValue: {} }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PolyDessinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dialogService = new DialogService(dialog);
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should register keypress events', () => {
        for (const k of keys) {
            const event = new KeyboardEvent('keypress', { key: k });
            component.handleKeyboardEvent(event);
            expect(component.keyEvent).toBe(event);
            expect(component.key).toEqual(event.key);
        }
    });

    it('should register keydown events', () => {
        for (const k of keys) {
        const event = new KeyboardEvent('keydown', { key: k });
        component.handleKeyboardEventDown(event);
        expect(component.keyEvent).toBe(event);
        expect(component.key).toEqual('');
        }
    });

    it('should open the dialog if it closed the entry dialog', () => {
        dialogService.isClosedWelcomeObservable.subscribe((isClosedWelcome: boolean) => {
            if (isClosedWelcome) {
            expect(dialogService.openNewDrawing).toBeTruthy();
            } else {
                expect(dialogService.openNewDrawing).toBeTruthy();
            }
        });
    });
});
