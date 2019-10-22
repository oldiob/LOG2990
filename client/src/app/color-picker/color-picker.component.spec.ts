import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DOMRenderer } from 'src/utils/dom-renderer';
import { ColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPickerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'appendChild', 'setAttribute', 'setStyle']);
    DOMRenderer.renderer = renderer;

    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
