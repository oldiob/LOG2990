import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import SpyObj = jasmine.SpyObj;
import {
    MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDialogRef,
    MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { KeytrackDirective } from 'src/directive/keytrack.directive';
import { MousetrackDirective } from 'src/directive/mousetrack.directive';
import { IndexService } from 'src/services/index/index.service';
import { AppComponent } from './app.component';
import { DevPanelComponent } from './dev-panel/dev-panel.component';
import { DrawAreaComponent } from './draw-area/draw-area.component';
import { EntryPointComponent } from './entry-point/entry-point.component';
import { NewDrawingComponent } from './new-drawing/new-drawing.component';
import { PolyDessinComponent } from './poly-dessin/poly-dessin.component';
import { RectangleComponent } from './rectangle/rectangle.component';
import { ColorOptionComponent } from './toolbar/color-option/color-option.component';
import { ShapeOptionComponent } from './toolbar/shape-option/shape-option.component';
import { ToolOptionComponent } from './toolbar/tool-option/tool-option.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WorkZoneComponent } from './work-zone/work-zone.component';

describe('AppComponent', () => {
    let indexServiceSpy: SpyObj<IndexService>;
    const matDialogRefSpy: jasmine.Spy = jasmine.createSpy('MAT_DIALOG_DATA');

    beforeEach(() => {
        indexServiceSpy = jasmine.createSpyObj('IndexService', ['basicGet']);
        indexServiceSpy.basicGet.and.returnValue(of({ title: '', body: '' }));
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                HttpClientModule,
                MatButtonModule,
                MatCardModule,
                MatCheckboxModule,
                MatDialogModule,
                MatDividerModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatTableModule,
                ReactiveFormsModule,
            ],
            declarations: [
                AppComponent,
                ColorOptionComponent,
                DevPanelComponent,
                DrawAreaComponent,
                EntryPointComponent,
                KeytrackDirective,
                MousetrackDirective,
                NewDrawingComponent,
                PolyDessinComponent,
                ShapeOptionComponent,
                ToolOptionComponent,
                ToolbarComponent,
                WorkZoneComponent,
                RectangleComponent,
            ],
            providers: [
                { provide: IndexService, useValue: indexServiceSpy },
                { provide: MatDialogRef, useValue: matDialogRefSpy },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
