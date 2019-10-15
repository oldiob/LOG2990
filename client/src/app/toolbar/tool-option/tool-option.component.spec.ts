import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowcaseComponent } from '../showcase/showcase.component';
import { WidthComponent } from '../width/width.component';
import { ToolOptionComponent } from './tool-option.component';

describe('ToolOptionComponent', () => {
  let component: ToolOptionComponent;
  let fixture: ComponentFixture<ToolOptionComponent>;
  let showcase: ShowcaseComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolOptionComponent, ShowcaseComponent, WidthComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    showcase = jasmine.createSpyObj('ShowcaseComponent', ['showcase', 'display']);
    component.showcase = showcase;
    component.ngOnInit();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pencil be the current tool', () => {
    component.select();
    expect(component.currentTool).toBe(component.tools[0]);
  });

  it('should getImage of the current tool', () => {
    component.getImage();
    expect(component.getImage()).toBe(component.images.get(component.currentTool) as string);
  });

  it('should not show primary and secondary', () => {
      expect(component.isShowPrimary).toBeFalsy();
      expect(component.isShowSecondary).toBeFalsy();
  });

  it('should select pencil tool and expect showcase to display', () => {
      component.selectTool(component.currentTool);
      component.currentTool = component.tools[0];
      component.showcase.display(component.currentTool);
      expect(showcase.display).toHaveBeenCalled();
    });

  it('should select texture for brush', () => {
    component.selectTexture(component.currentTexture);
    component.currentTexture = component.textures[0];
    component.showcase.display(component.currentTool);
    expect(component.currentTexture).toEqual(component.textures[0]);
    expect(showcase.display).toHaveBeenCalled();
  });

  it('should select emoji for stamp', () => {
    component.selectStamp(component.currentPath);
    component.currentStamp = component.stamps[0];
    component.showcase.display(component.currentTool);
    expect(component.currentStamp).toEqual(component.stamps[0]);
    expect(showcase.display).toHaveBeenCalled();
  });

  it('should set width of the current tool on display', () => {
      const width = 50;
      component.setWidth(width);
      expect(component.currentTool.width).toEqual(width);
      expect(showcase.display).toHaveBeenCalled();
  });

  it('should set angle of the current tool on display', () => {
    const angle = 50;
    component.setAngle(angle);
    expect(component.currentTool.angle).toEqual(angle);
    expect(showcase.display).toHaveBeenCalled();
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
