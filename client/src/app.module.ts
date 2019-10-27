import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, RendererFactory2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MAT_CHIPS_DEFAULT_OPTIONS, MAT_DIALOG_DATA,
    MAT_DIALOG_DEFAULT_OPTIONS, MatButtonModule,
    MatCardModule, MatCheckboxModule, MatDialogModule,
    MatDialogRef, MatDividerModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule, MatTableModule
} from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerComponent } from './app/color-picker/color-picker.component';
import { CustomAlertComponent } from './app/custom-alert/custom-alert.component';
import { DrawAreaComponent } from './app/draw-area/draw-area.component';
import { EntryPointComponent } from './app/entry-point/entry-point.component';
import { LoadDrawingComponent } from './app/load-drawing/load-drawing.component';
import { NewDrawingComponent } from './app/new-drawing/new-drawing.component';
import { PolyDessinComponent } from './app/poly-dessin/poly-dessin.component';
import { ThumbnailComponent } from './app/thumbnail/thumbnail.component';
import { AngleComponent } from './app/toolbar/angle/angle.component';
import { BucketOptionComponent } from './app/toolbar/bucket-option/bucket-option.component';
import { ColorOptionComponent } from './app/toolbar/color-option/color-option.component';
import { GalleryOptionComponent } from './app/toolbar/gallery-option/gallery-option.component';
import { GridOptionComponent } from './app/toolbar/grid-option/grid-option.component';
import { JunctionComponent } from './app/toolbar/junction-width/junction-width.component';
import { MyInjector } from 'src/utils/injector';
import { SaveOptionComponent } from './app/toolbar/save-option/save-option.component';
import { SelectorOptionComponent } from './app/toolbar/selector-option/selector-option.component';
import { ShapeOptionComponent } from './app/toolbar/shape-option/shape-option.component';
import { ShowcaseComponent } from './app/toolbar/showcase/showcase.component';
import { TextOptionComponent } from './app/toolbar/text-option/text-option.component';
import { ToolOptionComponent } from './app/toolbar/tool-option/tool-option.component';
import { ToolbarComponent } from './app/toolbar/toolbar.component';
import { WidthComponent } from './app/toolbar/width/width.component';
import { WorkZoneComponent } from './app/work-zone/work-zone.component';
import { DOMRenderer } from './utils/dom-renderer';

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
        ThumbnailComponent,
        SaveOptionComponent,
        JunctionComponent,
        CustomAlertComponent,
        LoadDrawingComponent,
        SelectorOptionComponent,
        GridOptionComponent,
        TextOptionComponent,
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
        MatChipsModule,
        MatIconModule,
        MatMenuModule,
    ],
    exports: [
        MatDividerModule,
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS, useValue: {
                separatorKeyCodes: [ENTER, COMMA],
            },
        },
    ],
    bootstrap: [PolyDessinComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [
        EntryPointComponent,
        NewDrawingComponent,
        GalleryOptionComponent,
        SaveOptionComponent,
        CustomAlertComponent,
        LoadDrawingComponent,
    ],
})
export class AppModule {
    constructor(rendererFactory: RendererFactory2, injector: Injector) {
        DOMRenderer.init(rendererFactory);
        MyInjector.init(injector);
    }
}
