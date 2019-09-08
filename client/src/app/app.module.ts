import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './components/app/app.component';
import {DevPanelComponent} from './components/dev-panel/dev-panel.component';
import {DrawAreaComponent} from './components/draw-area/draw-area.component';
import {NewDrawingComponent} from './components/new-drawing/new-drawing.component';
import {StrokeComponent} from './components/stroke/stroke.component';
import {ToolbarOptionComponent} from './components/toolbar/toolbar-option/toolbar-option.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {WorkZoneComponent} from './components/work-zone/work-zone.component';


import {KeytrackDirective} from './directive/keytrack.directive';
import {MousetrackDirective} from './directive/mousetrack.directive';

// Toolbar
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SelectorComponent } from './components/toolbar/selector/selector.component';
import { ColorSelectorComponent } from './components/toolbar/selector/color-selector/color-selector.component';
import { ToolSelectorComponent } from './components/toolbar/selector/tool-selector/tool-selector.component';
import { ShapeSelectorComponent } from './components/toolbar/selector/shape-selector/shape-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    DrawAreaComponent,
    WorkZoneComponent,
    StrokeComponent,
    MousetrackDirective,
    DevPanelComponent,
    ToolbarOptionComponent,
    NewDrawingComponent,
    KeytrackDirective,

    ToolbarComponent,
    SelectorComponent,
    ColorSelectorComponent,
    ToolSelectorComponent,
    ShapeSelectorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
