import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDialogModule,
        MatFormFieldModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaletteService } from 'src/services/palette/palette.service';
import { ShowcaseComponent } from '../showcase/showcase.component';
import { ShapeOptionComponent } from './shape-option.component';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';

describe('ShapeOptionComponent', () => {
    let component: ShapeOptionComponent;
    let fixture: ComponentFixture<ShapeOptionComponent>;
    let showcase: ShowcaseComponent;
    let renderer: Renderer2;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ShapeOptionComponent, ShowcaseComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [MatSelectModule, MatDialogModule, FormsModule,
                    BrowserAnimationsModule, BrowserDynamicTestingModule,
                    ReactiveFormsModule, MatButtonModule, MatCheckboxModule,
                    MatOptionModule, MatFormFieldModule],
            providers: [PaletteService],
        }).compileComponents();
    }));

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        RendererProvider.renderer = renderer;

        fixture = TestBed.createComponent(ShapeOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        showcase = jasmine.createSpyObj('ShowcaseComponent', ['showcase', 'display']);

        component.showcase = showcase;
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should rectangle be the current tool', () => {
      expect(component.currentTool).toBe(component.tools[0]);
    });

    it('should not show primary and secondary', () => {
        expect(component.isShowPrimary).toBeFalsy();
        expect(component.isShowSecondary).toBeFalsy();
    });

    it('should select rectangle tool and expect showcase to display', () => {
        component.selectTool(component.currentTool);
        component.currentTool = component.tools[0];
        component.showcase.display(component.currentTool);
        expect(showcase.display).toHaveBeenCalled();
      });

    it('should set width of the current tool on display', () => {
        const width = 100;
        component.setWidth(width);
        expect(component.currentTool.width).toEqual(width);
        expect(showcase.display).toHaveBeenCalled();
    });

    it('should trace type change on display', () => {
        component.onTraceTypeChange();
        expect(component.currentTool.traceType).toEqual(component.shapeForm.controls.traceType.value);
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
