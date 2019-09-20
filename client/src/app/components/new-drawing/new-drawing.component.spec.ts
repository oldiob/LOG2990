import { async, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkZoneService } from 'src/app/services/work-zone.service';
import { NewDrawingComponent } from './new-drawing.component';

describe('NewDrawingComponent', () => {
  let newDrawingComponent: NewDrawingComponent;
  let workZoneService: WorkZoneService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
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
    // Injection of FromBuilder and workZoneService
    workZoneService = new WorkZoneService();
    newDrawingComponent = new NewDrawingComponent(new FormBuilder(), workZoneService);
    newDrawingComponent.ngOnInit();
  });

  it('should create a new drawing component', () => {
    expect(newDrawingComponent).toBeTruthy();
  });

  it('should create a form', () => {
    expect(newDrawingComponent.newDrawingFrom).toBeTruthy();
  });

  it('#createForm should create a width, height and background color form input', () => {
    expect(newDrawingComponent.newDrawingFrom.contains('width')).toBeTruthy();
    expect(newDrawingComponent.newDrawingFrom.contains('height')).toBeTruthy();
    expect(newDrawingComponent.newDrawingFrom.contains('backgroundColor')).toBeTruthy();
  });

  it('should get width, height and background form input values', () => {
    expect(newDrawingComponent.width).toBe(newDrawingComponent.newDrawingFrom.controls.width.value);
    expect(newDrawingComponent.height).toBe(newDrawingComponent.newDrawingFrom.controls.height.value);
    expect(newDrawingComponent.backgroundColor).toBe(newDrawingComponent.newDrawingFrom.controls.backgroundColor.value);
  });

  it('#onSubmit should update draw area height, width and background color', () => {
    const WIDTH = newDrawingComponent.width;
    const HEIGHT = newDrawingComponent.height;
    const BACKGROUND_COLOR = newDrawingComponent.backgroundColor;

    newDrawingComponent.onSubmit();

    workZoneService.currentWidth.subscribe(
      (currentHeight) => expect(currentHeight).toBe(WIDTH),
    );
    workZoneService.currentHeight.subscribe(
      (currentHeight) => expect(currentHeight).toBe(HEIGHT),
    );
    workZoneService.currentBackgroundColor.subscribe(
      (currentBackgroundColor) => expect(currentBackgroundColor).toBe(BACKGROUND_COLOR),
    );
  });

  it('#onSubmit should raise displayChange event', () => {
    let isShowNewDrawing = true;
    newDrawingComponent.displayChange.subscribe(
      (isShow: boolean) => isShowNewDrawing = isShow,
    );
    newDrawingComponent.onSubmit();
    expect(isShowNewDrawing).toBeFalsy();
  });

  it('should change background color form control', () => {
    const BACKGROUND_COLOR = '#CCCCCC';
    newDrawingComponent.chooseBgColor(BACKGROUND_COLOR);
    expect(newDrawingComponent.newDrawingFrom.controls.backgroundColor.value).toBe(BACKGROUND_COLOR);

  });

  it('should fetch default dimensions from work zone service and update its default dimensions', () => {
    workZoneService.currentMaxWidth.subscribe((maxWidth) => {
      newDrawingComponent.newDrawingFrom.controls.width.setValue(maxWidth);
      expect(newDrawingComponent.width).toBe(maxWidth);
    });
    workZoneService.currentMaxWidth.subscribe((maxHeight) => {
      newDrawingComponent.newDrawingFrom.controls.height.setValue(maxHeight);
      expect(newDrawingComponent.height).toBe(maxHeight);
    });
  });

});
