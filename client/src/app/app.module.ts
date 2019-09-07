<<<<<<< HEAD
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app/app.component';
import { DevPanelComponent } from './components/dev-panel/dev-panel.component';
import { DrawAreaComponent } from './components/draw-area/draw-area.component';
import {NewDrawingComponent} from './components/new-drawing/new-drawing.component';
import { StrokeComponent } from './components/stroke/stroke.component';
import { ToolbarOptionComponent } from './components/toolbar/toolbar-option/toolbar-option.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WorkZoneComponent } from './components/work-zone/work-zone.component';
import { KeytrackDirective } from './directive/keytrack.directive';
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
    ToolbarOptionComponent,
    KeytrackDirective,
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
=======
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app/app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DrawAreaComponent } from './components/draw-area/draw-area.component';
import { WorkZoneComponent } from './components/work-zone/work-zone.component';
import { ToolbarOptionComponent } from './components/toolbar/toolbar-option/toolbar-option.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DrawAreaComponent,
    WorkZoneComponent,
    ToolbarOptionComponent
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
>>>>>>> making toolbar elements one next to another
