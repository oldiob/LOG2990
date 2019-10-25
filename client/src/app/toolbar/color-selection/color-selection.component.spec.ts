import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ColorSelectionComponent } from './color-selection.component';

describe('ColorSelectionComponent', () => {
  let component: ColorSelectionComponent;
  let fixture: ComponentFixture<ColorSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorSelectionComponent],
      providers: [{
        provide: MatDialogRef,
        useValue: {
          close: (dialogResult: any) => {
            //
          },
        },
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
