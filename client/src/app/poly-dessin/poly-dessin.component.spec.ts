import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from 'src/services/dialog/dialog.service';
import { EntryPointComponent } from '../popups/entry-point/entry-point.component';
import { PolyDessinComponent } from './poly-dessin.component';

describe('PolyDessinComponent', () => {
    let component: PolyDessinComponent;
    let fixture: ComponentFixture<PolyDessinComponent>;
    let dialogService: DialogService;

    beforeEach(async(() => {
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [EntryPointComponent],
            },
        });
        TestBed.configureTestingModule({
            declarations: [PolyDessinComponent, EntryPointComponent],
            imports: [HttpClientModule, BrowserAnimationsModule, BrowserDynamicTestingModule, MatDialogModule, MatSnackBarModule],
            providers: [DialogService,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PolyDessinComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        dialogService = TestBed.get(DialogService);
    });

    it('should create', () => {
        component.ngOnInit();
        expect(component).toBeTruthy();
    });

    it('should open the dialog if it closed the entry dialog', () => {
        spyOn(dialogService, 'openEntryPoint').and.callFake(() => { return; });
        component.isShowWelcome = true;
        component.ngOnInit();
        expect(dialogService.openEntryPoint).toHaveBeenCalled();
    });
});
