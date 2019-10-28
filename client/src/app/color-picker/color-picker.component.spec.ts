import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DOMRenderer } from 'src/utils/dom-renderer';
import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;
  let mouseDown: MouseEvent;
  let mouseUp: MouseEvent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPickerComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'appendChild', 'setAttribute', 'setStyle']);
    DOMRenderer.renderer = renderer;

    mouseDown = new MouseEvent('mousedown');
    mouseUp = new MouseEvent('mouseup');

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#createPickerIcon render picker icon', () => {
    expect(DOMRenderer.renderer.createElement).toHaveBeenCalled();
    expect(DOMRenderer.renderer.appendChild).toHaveBeenCalled();
    expect(DOMRenderer.renderer.setStyle).toHaveBeenCalled();
  });

  it('#ngOnInit render picker icon', () => {
    component.pickColor(mouseDown);
    component.pickColor(mouseUp);
  });
});
