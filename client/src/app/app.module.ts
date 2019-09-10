import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import { MAT_DIALOG_DATA, MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatDialogRef, MatDividerModule,
         MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule } from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppComponent} from './components/app/app.component';
import { DrawAreaComponent } from './components/draw-area/draw-area.component';
import { EntryPointComponent } from './components/entry-point/entry-point.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WorkZoneComponent } from './components/work-zone/work-zone.component';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DrawAreaComponent,
    WorkZoneComponent,
    EntryPointComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  exports: [
    MatDividerModule,
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: [] },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EntryPointComponent,
  ],
})
export class AppModule {
}
