import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridTool } from 'src/services/tool/tool-options/grid';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { GridOptionComponent } from './grid-option.component';

describe('GridOptionComponent', () => {
  let component: GridOptionComponent;
  let fixture: ComponentFixture<GridOptionComponent>;
  let grid: GridTool;
  let renderer: Renderer2;
  const BUTTON = 'grid.png';
  const PATH  = '../../../../assets/images/';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridOptionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
    DOMRenderer.renderer = renderer;
    fixture = TestBed.createComponent(GridOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    grid = TestBed.get(GridTool);

});

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('should grid be the current tool', () => {
    expect(component.currentTool).toBe(grid);
  });

  it('should not show primary and secondary', () => {
      expect(component.isShowPrimary).toBeFalsy();
      expect(component.isShowSecondary).toBeFalsy();
  });

  it('should get image of grid tool', () => {
    component.getImage();
    expect(component.getImage()).toEqual(BUTTON);
  });

  it('should select current tool', () => {
    component.select();
    expect(component.currentTool).toEqual(grid);
  });

  it('should select selector tool', () => {
      component.selectTool(component.currentTool);
      expect(component.currentTool).toEqual(grid);
    });

  it('should return string to get file source and button image', () => {
    component.getFilesource(grid);
    expect(component.getFilesource(grid)).toEqual(PATH + BUTTON);
  });

  it('should show primary color', () => {
      component.togglePrimaryColorPicker();
      expect(component.isShowSecondary).toBeFalsy();
      expect(component.isShowPrimary).toBeTruthy();
  });

  it('should show secondary color', () => {
      component.toggleSecondaryColorPicker();
      expect(component.isShowSecondary).toBeTruthy();
      expect(component.isShowPrimary).toBeFalsy();
  });

  it('should swap primary and secondary color', () => {
      component.onSwap();
      expect(component.onSwap).toBeTruthy();
  });

  it('should pick color and call hideColorPicker', () => {
      component.isShowPrimary = true;
      component.onColorPick();
      expect(component.hideColorPicker).toBeTruthy();
  });

  it('should hide primary color', () => {
      component.isShowPrimary = true;
      component.hideColorPicker();
      expect(component.isShowPrimary).toBeFalsy();
  });

  it('should hide secondary color', () => {
      component.isShowPrimary = false;
      component.hideColorPicker();
      expect(component.isShowSecondary).toBeFalsy();
  });

});
