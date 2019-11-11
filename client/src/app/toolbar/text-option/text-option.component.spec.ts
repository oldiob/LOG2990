import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SVGText } from 'src/services/svg/element/svg.text';
import { TextTool } from 'src/services/tool/tool-options/text';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { ShowcaseComponent } from '../subcomponent/showcase/showcase.component';
import { TextOptionComponent } from './text-option.component';
import { TextFormat } from './text-format';

describe('TextOptionComponent', () => {
  let component: TextOptionComponent;
  let fixture: ComponentFixture<TextOptionComponent>;
  let text: TextTool;
  let renderer: Renderer2;
  let element: SVGText | null;
  let showcase: ShowcaseComponent;
  const BUTTON = 'text.png';
  const PATH  = '../../../../assets/images/';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextOptionComponent, ShowcaseComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    element = jasmine.createSpyObj('SVGText', ['setFontWeight', 'setFontStyle', 'setTextAlign', 'setFontSize', 'setFontFamily']);
    renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
    DOMRenderer.renderer = renderer;
    fixture = TestBed.createComponent(TextOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    text = TestBed.get(TextTool);
    component.currentTool = component.tools[0];
    showcase = jasmine.createSpyObj('ShowcaseComponent', ['showcase', 'display']);
    component.showcase = showcase;
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

  it('should select selector tool', () => {
      component.selectTool(component.currentTool);
      expect(component.currentTool).toEqual(text);
    });

  it('should return string to get file source and button image', () => {
    component.getFilesource(text);
    expect(component.getFilesource(text)).toEqual(PATH + BUTTON);
  });

  it('should font size equal to 15px', () => {
    const fontSize = '15px';
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
