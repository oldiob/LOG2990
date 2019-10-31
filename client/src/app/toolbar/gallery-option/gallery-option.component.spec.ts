import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatMenuModule, MatSnackBarModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CustomAlertComponent } from 'src/app/popups/custom-alert/custom-alert.component';
import { Drawing } from 'src/services/draw-area/i-drawing';
import { GalleryOptionComponent } from './gallery-option.component';

describe('GalleryOptionComponent', () => {
  let component: GalleryOptionComponent;
  let fixture: ComponentFixture<GalleryOptionComponent>;
  let filterInput: ElementRef<HTMLInputElement>;
  let filteredDrawings: Drawing[];

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
              entryComponents: [CustomAlertComponent],
            },
      });
    TestBed.configureTestingModule({
      declarations: [GalleryOptionComponent, CustomAlertComponent],
      imports: [MatMenuModule, MatDialogModule, MatSnackBarModule, BrowserAnimationsModule, BrowserDynamicTestingModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryOptionComponent);
    component = fixture.componentInstance;
    filteredDrawings = [{
      id: 17,

      name: 'test',
      tags: ['allo'],
      holder: { entry: 'entry', elements: ['vide'] },

      backgroundColor: '#ffffff',
      width: 200,
      height: 200,
    }];
    component.drawings = filteredDrawings;
    component.filteredDrawings = filteredDrawings;

    fixture.detectChanges();
    filterInput = jasmine.createSpyObj('ElementRef<HTMLInputElement>', ['']);
    component.filterInput = filterInput;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
