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
      _id: '17',

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
    filterInput = jasmine.createSpyObj('ElementRef<HTMLInputElement>', ['nativeElement', 'entry']);
    component.filterInput = filterInput;
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load', () => {
    component.load();
    component.drawings = [];
    component.webClientService.getAllDrawings().subscribe((savedDrawing: Drawing[]) => {
      component.drawings = savedDrawing;
      expect(component.drawings).toEqual(savedDrawing);
    });
  });

  it('should filter drawings', () => {
    const filterValue = 'filterTest';
    component.filter = filterValue;
    component.filterDrawings(filterValue);
    expect(component.filter).toEqual(filterValue.toLowerCase());
  });

  it('should clear filters', () => {
    component.filterInput.nativeElement.value = '';
    component.clearFilters();
    expect(component.filteredDrawings).toEqual(filteredDrawings);
    expect(filterInput.nativeElement.value).toEqual('');
    expect(component.isTagExists).toBeTruthy();
  });

  it('should select', () => {
    expect(component.select()).toBeUndefined();
  });

  it('should get gallery image', () => {
    const IMAGE = '../../../assets/images/gallery.png';
    expect(component.getImage()).toEqual(IMAGE);
  });

  it('should go to the previous page', () => {
    const previousPage = 2;
    component.page = 3;
    component.previousPage();
    expect(component.page).toEqual(previousPage);
  });

  it('should go to the next page', () => {
    component.nPages = 4;
    component.page = 1;
    component.nextPage();
    expect(component.page).toEqual(component.nPages );
  });

});
