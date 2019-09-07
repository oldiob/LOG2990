import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewDrawingComponent} from './components/new-drawing/';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app/app.component';
import { DevPanelComponent } from './components/dev-panel/dev-panel.component';
import { DrawAreaComponent } from './components/draw-area/draw-area.component';
import { StrokeComponent } from './components/stroke/stroke.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WorkZoneComponent } from './components/work-zone/work-zone.component';
import { MousetrackDirective } from './directive/mousetrack.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DrawAreaComponent,
    WorkZoneComponent,
    NewDrawingComponent,
    StrokeComponent,
    MousetrackDirective,
    DevPanelComponent,
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
