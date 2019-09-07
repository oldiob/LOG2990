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
