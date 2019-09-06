import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app/app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DrawAreaComponent } from './draw-area/draw-area.component';
import { WorkZoneComponent } from './work-zone/work-zone.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DrawAreaComponent,
    WorkZoneComponent,
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
