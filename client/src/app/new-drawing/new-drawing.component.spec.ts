import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDialogModule, MatDialogRef, MatDividerModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
import { EntryPointComponent } from '../entry-point/entry-point.component';
import { NewDrawingComponent } from './new-drawing.component';

describe('NewDrawingComponent', () => {
    let component: NewDrawingComponent;
    let fixture: ComponentFixture<NewDrawingComponent>;
    const mockDialogRefSpy: {close: jasmine.Spy} = {
      close: jasmine.createSpy('close'),
    };
    let workZoneService: WorkZoneService;
    beforeEach(async(() => {
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                    entryComponents: [EntryPointComponent],
            },
        });
        TestBed.configureTestingModule({
        imports: [MatDividerModule, MatCheckboxModule, BrowserAnimationsModule, BrowserDynamicTestingModule,
        MatDialogModule, FormsModule, ReactiveFormsModule],
        declarations: [ NewDrawingComponent, EntryPointComponent],
        providers: [{provide: MatDialogRef, useValue: mockDialogRefSpy},
                    {provide: EntryPointComponent},
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NewDrawingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      workZoneService = new WorkZoneService();
      component.ngOnInit();
    });

    it('should create a new drawing component', () => {
    expect(component).toBeTruthy();
  });

    it('should create a form', () => {
    expect(component.newDrawingFrom).toBeTruthy();
  });

    it('#createForm should create a width, height and background color form input', () => {
    expect(component.newDrawingFrom.contains('width')).toBeTruthy();
    expect(component.newDrawingFrom.contains('height')).toBeTruthy();
    expect(component.newDrawingFrom.contains('backgroundColor')).toBeTruthy();
  });

    it('should get width, height and background form input values', () => {
    expect(component.width).toBe(component.newDrawingFrom.controls.width.value);
    expect(component.height).toBe(component.newDrawingFrom.controls.height.value);
    expect(component.backgroundColor).toBe(component.newDrawingFrom.controls.backgroundColor.value);
  });

    it('#onSubmit should update draw area height, width and background color', () => {
    const WIDTH = component.width;
    const HEIGHT = component.height;
    const BACKGROUND_COLOR = component.backgroundColor;

    component.onSubmit();

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
    component.displayChange.subscribe(
      (isShow: boolean) => isShowNewDrawing = isShow,
    );
    component.onSubmit();
    expect(isShowNewDrawing).toBeFalsy();
  });

    it('should change background color form control', () => {
    const BACKGROUND_COLOR = '#CCCCCC';
    component.chooseBgColor(BACKGROUND_COLOR);
    expect(component.newDrawingFrom.controls.backgroundColor.value).toBe(BACKGROUND_COLOR);

  });

    it('should fetch default dimensions from work zone service and update its default dimensions', () => {
    workZoneService.currentMaxWidth.subscribe((maxWidth) => {
        component.newDrawingFrom.controls.width.setValue(maxWidth);
        expect(component.width).toBe(maxWidth);
    });
    workZoneService.currentMaxWidth.subscribe((maxHeight) => {
        component.newDrawingFrom.controls.height.setValue(maxHeight);
        expect(component.height).toBe(maxHeight);
    });
  });

    it('should open entry point dialog', () => {
      component.openEntryDialog();
      expect(component.dialog.open).toBeTruthy();
    });

    it('should return false if the result is false in the session storage', () => {
      sessionStorage.setItem('false', JSON.stringify(false));
      expect(sessionStorage.getItem('false')).toBe('false');
    });

    it('should return true if the result is true in the session storage', () => {
      sessionStorage.setItem('true', JSON.stringify(true));
      expect(sessionStorage.getItem('true')).toBe('true');
    });

    it('should return false in the session storage if the dialog is closed', () => {
      component.dialog.closeAll();
      expect(sessionStorage.getItem('false')).toBe('false');
    });
});
