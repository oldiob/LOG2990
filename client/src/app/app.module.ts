import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app/app.component';
import {DevPanelComponent} from './components/dev-panel/dev-panel.component';
import {DrawAreaComponent} from './components/draw-area/draw-area.component';
import {NewDrawingComponent} from './components/new-drawing/new-drawing.component';
import {ColorSelectorComponent} from './components/toolbar/selector/color-selector/color-selector.component';
import {SelectorComponent} from './components/toolbar/selector/selector.component';
import {ShapeSelectorComponent} from './components/toolbar/selector/shape-selector/shape-selector.component';
import {ToolSelectorComponent} from './components/toolbar/selector/tool-selector/tool-selector.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {WorkZoneComponent} from './components/work-zone/work-zone.component';
import {KeytrackDirective} from './directive/keytrack.directive';
import {MousetrackDirective} from './directive/mousetrack.directive';
import {PolyDessinComponent } from './components/poly-dessin/poly-dessin.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawAreaComponent,
    WorkZoneComponent,
    MousetrackDirective,
    DevPanelComponent,
    NewDrawingComponent,
    KeytrackDirective,

    ToolbarComponent,
    SelectorComponent,
    ColorSelectorComponent,
    ToolSelectorComponent,
    ShapeSelectorComponent,
    PolyDessinComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
