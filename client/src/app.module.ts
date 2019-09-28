import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDialogRef,
    MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { DrawAreaComponent } from './app/draw-area/draw-area.component';
import { EntryPointComponent } from './app/entry-point/entry-point.component';
import { NewDrawingComponent } from './app/new-drawing/new-drawing.component';
import { PolyDessinComponent } from './app/poly-dessin/poly-dessin.component';
import { ColorOptionComponent } from './app/toolbar/color-option/color-option.component';
import { ToolOptionComponent } from './app/toolbar/tool-option/tool-option.component';
import { ToolbarComponent } from './app/toolbar/toolbar.component';
import { WorkZoneComponent } from './app/work-zone/work-zone.component';
import { KeytrackDirective } from './directive/keytrack.directive';
import { MousetrackDirective } from './directive/mousetrack.directive';
import { ColorPickerComponent } from './app/color-picker/color-picker.component';
import { ShapeOptionComponent } from './app/toolbar/shape-option/shape-option.component';

@NgModule({
    declarations: [
        AppComponent,
        ColorOptionComponent,
        DrawAreaComponent,
        EntryPointComponent,
        KeytrackDirective,
        MousetrackDirective,
        NewDrawingComponent,
        PolyDessinComponent,
        ToolOptionComponent,
        ToolbarComponent,
        WorkZoneComponent,
        ColorPickerComponent,
        ShapeOptionComponent,
    ],
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
    exports: [
        MatDividerModule,
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        EntryPointComponent,
        NewDrawingComponent,
    ],
})

export class AppModule {
}
