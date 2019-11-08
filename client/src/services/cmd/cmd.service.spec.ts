import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDialogModule, MatDialogRef, MatDividerModule, MatSnackBarModule, MatSnackBarRef } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { EntryPointComponent } from 'src/app/popups/entry-point/entry-point.component';
import { NewDrawingComponent } from 'src/app/popups/new-drawing/new-drawing.component';
import {CmdService} from './cmd.service';

describe('cmdService', () => {
    let service: CmdService;

    let openDialogSpy: jasmine.Spy;
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });

    beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [
          EntryPointComponent,
          NewDrawingComponent,
        ],
      },
    });
    TestBed.configureTestingModule({
      imports: [
        MatDividerModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
      ],
      declarations: [
        NewDrawingComponent,
        EntryPointComponent,
      ],
      providers: [
        { provide: MatDialogRef },
        { provide: MatSnackBarRef },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

    beforeEach(() => {
        service = TestBed.get(CmdService);
    });

});
