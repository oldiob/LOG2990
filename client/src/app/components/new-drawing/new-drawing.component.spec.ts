import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WorkZoneService } from 'src/app/services/work-zone.service';
import { NewDrawingComponent } from './new-drawing.component';

fdescribe('NewDrawingComponent', () => {
  let newDrawingComponent: NewDrawingComponent;
  let fixture: ComponentFixture<NewDrawingComponent>;
  // let workZoneService: WorkZoneService;
  // let formBuidler: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewDrawingComponent],
      providers: [
        { provide: WorkZoneService },
        { provide: FormBuilder },
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDrawingComponent);
    newDrawingComponent = fixture.componentInstance;
    fixture.detectChanges();

    // workZoneService = TestBed.get(WorkZoneService);
    // formBuidler = TestBed.get(FormBuilder);
  });

  it('should create', () => {
    expect(newDrawingComponent).toBeTruthy();
  });

  describe('createForm() method', () => {
    it('should create a form', () => {
      expect(newDrawingComponent.newDrawingFrom).toBeTruthy();
    });
    it('should create a height form control', () => {
      expect(newDrawingComponent.newDrawingFrom.contains('height')).toBeTruthy();
    });
    it('should create a width form control', () => {
      expect(newDrawingComponent.newDrawingFrom.contains('width')).toBeTruthy();
    });
    it('should create a background form control', () => {
      expect(newDrawingComponent.newDrawingFrom.contains('backgroundColor')).toBeTruthy();
    });
  });

  // describe('onSubmit() method', () => {
  //   it('should create a form', () => {
  //     expect(newDrawingComponent.newDrawingFrom).toBeTruthy();
  //   });
  // });

});
