import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridService } from 'src/services/grid/grid.service';
import { GridTool } from 'src/services/tool/tool-options/grid';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { GridOptionComponent } from './grid-option.component';

describe('GridOptionComponent', () => {
  let component: GridOptionComponent;
  let fixture: ComponentFixture<GridOptionComponent>;
  let grid: GridTool;
  let renderer: Renderer2;
  let gridService: GridService;
  let ref: ElementRef;
  const BUTTON = 'grid.png';
  const PATH  = '../../../../assets/images/';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridOptionComponent ],
      providers: [GridService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    ref = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    gridService = jasmine.createSpyObj('GridService', ['clear', 'draw', 'opacity', 'step']);
    renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
    DOMRenderer.renderer = renderer;
    fixture = TestBed.createComponent(GridOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    grid = TestBed.get(GridTool);
    component.gridService = gridService;
    component.gridService.ref = ref;

});

  it('should create', () => {
      expect(component).toBeTruthy();
  });

  it('should grid be the current tool', () => {
    expect(component.currentTool).toBe(grid);
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
  
  it('should draw grid if it is toggle', () => {
    component.isOn = true;
    component.toggleGrid();
    expect(gridService.draw).toHaveBeenCalled();
  });

  it('should clear grid if it is not toggle', () => {
    component.isOn = false;
    component.toggleGrid();
    expect(gridService.clear).toHaveBeenCalled();
  });

  it('should opacity change' , () => {
    component.opacity = 0.8;
    component.onOpacity();
    expect(gridService.opacity).toEqual(component.opacity);
  });

  it('should step change ', () => {
    component.step = 5;
    component.onStep();
    expect(gridService.step).toEqual(component.step);
  });

});
