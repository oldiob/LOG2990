import { async, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDialog, MatDialogModule,
   MatDialogRef, MatDividerModule, MatSnackBarModule, MatSnackBarRef } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { EntryPointComponent } from 'src/app/popups/entry-point/entry-point.component';
import { NewDrawingComponent } from 'src/app/popups/new-drawing/new-drawing.component';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
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

  let service: DialogService;
  beforeEach(() => {
    service = TestBed.get(DialogService);

    openDialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#isClosedWelcomeObservable should get isClosedWelcome observable', () => {
    service.isClosedWelcomeObservable.subscribe((isClosed) => {
      expect(isClosed).toBeFalsy();
    });
  });

  it('#openNewDrawing should open NewDrawingComponent dialog', () => {
    service.openDialog(NewDrawingComponent);
    expect(openDialogSpy).toHaveBeenCalled();
  });

  const FAKE_COOKIE = 'hideWelcome';
  it('#openEntryPoint should open EntryPointComponent dialog', () => {
    service.openEntryPoint(FAKE_COOKIE);
    expect(openDialogSpy).toHaveBeenCalled();
  });

  it('#openEntryPoint should set cookie in session storage', () => {
    sessionStorage.setItem('hideWelcome', JSON.stringify(false));
    expect(sessionStorage.getItem('hideWelcome')).toBe('false');
  });

  it('#openEntryPoint should get null if nothing is set in session storage', () => {
  expect(sessionStorage.getItem('hideWelcome')).toBe(null);
  });
});
