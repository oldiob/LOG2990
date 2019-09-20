import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDialogRef,
    MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './components/app/app.component';
import { DevPanelComponent } from './components/dev-panel/dev-panel.component';
import { DrawAreaComponent } from './components/draw-area/draw-area.component';
import { EntryPointComponent } from './components/entry-point/entry-point.component';
import { NewDrawingComponent } from './components/new-drawing/new-drawing.component';
import { PolyDessinComponent } from './components/poly-dessin/poly-dessin.component';
import { RectangleComponent } from './components/rectangle/rectangle.component';
import { ColorSelectorComponent } from './components/toolbar/selector/color-selector/color-selector.component';
import { SelectorComponent } from './components/toolbar/selector/selector.component';
import { ShapeSelectorComponent } from './components/toolbar/selector/shape-selector/shape-selector.component';
import { ToolSelectorComponent } from './components/toolbar/selector/tool-selector/tool-selector.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WorkZoneComponent } from './components/work-zone/work-zone.component';
import { KeytrackDirective } from './directive/keytrack.directive';
import { MousetrackDirective } from './directive/mousetrack.directive';
//import { RectangleService } from './services/rectangle/rectangle.service';

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
        ShapeOptionComponent,
        SVGComponent,
        ToolOptionComponent,
        ToolbarComponent,
        WorkZoneComponent,
        RectangleComponent,

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
    ],
})

export class AppModule {
}
