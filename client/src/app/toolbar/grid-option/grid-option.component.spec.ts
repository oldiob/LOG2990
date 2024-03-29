import { CUSTOM_ELEMENTS_SCHEMA, ElementRef, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridService } from 'src/services/grid/grid.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { GridOptionComponent } from './grid-option.component';

describe('GridOptionComponent', () => {
  let component: GridOptionComponent;
  let fixture: ComponentFixture<GridOptionComponent>;
  let renderer: Renderer2;
  let gridService: GridService;
  let ref: ElementRef;
  const BUTTON = 'grid.png';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridOptionComponent],
      providers: [GridService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    ref = jasmine.createSpyObj('ElementRef', ['nativeElement']);
    gridService = jasmine.createSpyObj('GridService', ['clear', 'draw', 'opacity', 'step', 'toggleGrid']);
    renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
    DOMRenderer.renderer = renderer;
    fixture = TestBed.createComponent(GridOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    (component as any).gridService = gridService;
    (component as any).gridService.ref = ref;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get image of grid tool', () => {
    component.getImage();
    expect(component.getImage()).toEqual(BUTTON);
  });

  it('should draw grid if it is toggle', () => {
    component.isOn = true;
    component.toggleGrid();
    expect(gridService.toggleGrid).toHaveBeenCalled();
  });

  it('should opacity change', () => {
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
