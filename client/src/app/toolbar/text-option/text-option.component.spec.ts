import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SVGText } from 'src/services/svg/element/svg.text';
import { TextTool } from 'src/services/tool/tool-options/text';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { TextFormat } from './text-format';
import { TextOptionComponent } from './text-option.component';

describe('TextOptionComponent', () => {
  let component: TextOptionComponent;
  let fixture: ComponentFixture<TextOptionComponent>;
  let text: TextTool;
  let renderer: Renderer2;
  let element: SVGText | null;
  const BUTTON = 'text.png';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextOptionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    element = jasmine.createSpyObj('SVGText', ['setFontWeight', 'setFontStyle', 'setTextAlign', 'setFontSize', 'setFontFamily',
     'setRectangle', 'removeRectangle']);
    renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
    DOMRenderer.renderer = renderer;
    fixture = TestBed.createComponent(TextOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    text = TestBed.get(TextTool);
    text.element = element;
});

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('should selector be the current tool', () => {
    expect(component.currentTool).toBe(text);
  });

  it('should get image of selector tool', () => {
    component.getImage();
    expect(component.getImage()).toEqual(BUTTON);
  });

  it('should select current tool', () => {
    component.select();
    expect(component.currentTool).toEqual(text);
  });

  it('should font size equal to 15px', () => {
    const fontSize = 15;
    component.selectFontSize(fontSize);
    expect(text.fontSize).toEqual(fontSize);
    if (text.element !== null) {
      expect(text.element.setFontSize).toHaveBeenCalled();
    }
  });

  it('should font family equal to arial', () => {
    const fontFamily = component.fonts[0];
    component.currentFontFamily = fontFamily;
    component.selectFontFamily(fontFamily);
    expect(component.currentFontFamily).toEqual(fontFamily);
    if (text.element !== null) {
      expect(text.element.setFontFamily).toHaveBeenCalled();
    }
  });

  it('should select text align equal to left', () => {
    const textAlignLeft = TextFormat.ALIGNLEFT;
    component.selectTextAlign(textAlignLeft);
    expect(component.isAlignLeft).toBeTruthy();
  });

  it('should select text align equal to center', () => {
    const textAlignCenter = TextFormat.ALIGNCENTER;
    component.selectTextAlign(textAlignCenter);
    expect(component.isAlignCenter).toBeTruthy();
  });

  it('should select text align equal to right', () => {
    const textAlignRight = TextFormat.ALIGNRIGHT;
    component.selectTextAlign(textAlignRight);
    expect(component.isAlignRight).toBeTruthy();
  });

  it('should disable text align to false', () => {
    component.disableAlign();
    expect(component.isAlignLeft).toBeFalsy();
    expect(component.isAlignCenter).toBeFalsy();
    expect(component.isAlignRight).toBeFalsy();
  });

  it('should toggleBold text to bold', () => {
    const bold = TextFormat.BOLD;
    component.isBold = false;
    component.toggleBold();
    expect(text.fontWeigth).toEqual(bold);
    if (text.element !== null) {
    expect(text.element.setFontWeight).toHaveBeenCalled();
    }
  });

  it('should toggleItalic text to italic ', () => {
    const italic = TextFormat.ITALIC;
    component.isItalic = false;
    component.toggleItalic();
    expect(text.fontStyle).toEqual(italic);
  });

  it('should toggleBold text to normal', () => {
    const normal = TextFormat.NORMAL;
    component.isBold = true;
    component.toggleBold();
    expect(text.fontWeigth).toEqual(normal);
  });

  it('should toggleItalic text to normal ', () => {
    const normal = TextFormat.NORMAL;
    component.isItalic = true;
    component.toggleItalic();
    expect(text.fontStyle).toEqual(normal);
  });

});
