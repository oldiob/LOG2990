import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, RendererFactory2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDialogRef,
    MatDividerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerComponent } from './app/color-picker/color-picker.component';
import { DrawAreaComponent } from './app/draw-area/draw-area.component';
import { EntryPointComponent } from './app/entry-point/entry-point.component';
import { NewDrawingComponent } from './app/new-drawing/new-drawing.component';
import { PolyDessinComponent } from './app/poly-dessin/poly-dessin.component';
import { AngleComponent } from './app/toolbar/angle/angle.component';
import { BucketOptionComponent } from './app/toolbar/bucket-option/bucket-option.component';
import { ColorOptionComponent } from './app/toolbar/color-option/color-option.component';
import { GalleryOptionComponent } from './app/toolbar/gallery-option/gallery-option.component';
import { ShapeOptionComponent } from './app/toolbar/shape-option/shape-option.component';
import { ShowcaseComponent } from './app/toolbar/showcase/showcase.component';
import { ToolOptionComponent } from './app/toolbar/tool-option/tool-option.component';
import { ToolbarComponent } from './app/toolbar/toolbar.component';
import { WidthComponent } from './app/toolbar/width/width.component';
import { WorkZoneComponent } from './app/work-zone/work-zone.component';
import { RendererProvider } from './services/renderer-provider/renderer-provider';
import { JonctionComponent } from './app/toolbar/jonction-width/jonction-width.component';

@NgModule({
    declarations: [
        ColorOptionComponent,
        DrawAreaComponent,
        EntryPointComponent,
        NewDrawingComponent,
        PolyDessinComponent,
        ToolOptionComponent,
        ToolbarComponent,
        WorkZoneComponent,
        ColorPickerComponent,
        ShapeOptionComponent,
        BucketOptionComponent,
        GalleryOptionComponent,
        WidthComponent,
        ShowcaseComponent,
        AngleComponent,
        JonctionComponent,
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
    bootstrap: [PolyDessinComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        EntryPointComponent,
        NewDrawingComponent,
    ],
})

export class AppModule {
    constructor(rendererFactory: RendererFactory2) {
        RendererProvider.init(rendererFactory);
    }
}
