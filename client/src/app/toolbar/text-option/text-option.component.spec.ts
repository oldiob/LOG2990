import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextTool } from 'src/services/tool/tool-options/text';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { TextOptionComponent } from './text-option.component';

describe('TextOptionComponent', () => {
  let component: TextOptionComponent;
  let fixture: ComponentFixture<TextOptionComponent>;
  let text: TextTool;
  let renderer: Renderer2;
  const BUTTON = 'text.png';
  const PATH  = '../../../../assets/images/';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextOptionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
    DOMRenderer.renderer = renderer;
    fixture = TestBed.createComponent(TextOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    text = TestBed.get(TextTool);
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

});
