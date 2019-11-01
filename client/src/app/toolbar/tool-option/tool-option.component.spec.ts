import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule,
         MatMenuModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LineTool } from 'src/services/tool/tool-options/line';
import { StampTool } from 'src/services/tool/tool-options/stamp';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { AngleComponent } from '../angle/angle.component';
import { JunctionComponent } from '../junction-width/junction-width.component';
import { ShowcaseComponent } from '../showcase/showcase.component';
import { WidthComponent } from '../width/width.component';
import { ToolOptionComponent } from './tool-option.component';

describe('ToolOptionComponent', () => {
    let component: ToolOptionComponent;
    let fixture: ComponentFixture<ToolOptionComponent>;
    let showcase: ShowcaseComponent;
    let renderer: Renderer2;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatMenuModule, MatSelectModule, MatDialogModule, FormsModule,
                      BrowserAnimationsModule, BrowserDynamicTestingModule,
                      ReactiveFormsModule, MatButtonModule, MatCheckboxModule,
                      MatOptionModule, MatFormFieldModule],
            declarations: [ToolOptionComponent, ShowcaseComponent, WidthComponent, AngleComponent, JunctionComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        DOMRenderer.renderer = renderer;

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
        component.currentTool = component.tools[3];
        component.setAngle(angle);
        expect((component.currentTool as StampTool).angle).toEqual(angle);
        expect(showcase.display).toHaveBeenCalled();
    });

    it('should set junction width of the current tool on display', () => {
        const junctionWidth = 15;
        component.currentTool = component.tools[2];
        component.setJunctionWidth(junctionWidth);
        expect((component.currentTool as LineTool).junctionWidth).toEqual(junctionWidth);
        expect(showcase.display).toHaveBeenCalled();
    });

    it('should line type change on display', () => {
        component.onLineTypeChange();
        if (component.currentTool instanceof LineTool) {
            expect(component.currentTool.lineType).toEqual(component.lineForm.controls.lineType.value);
            expect(showcase.display).toHaveBeenCalled();
        }
    });

    it('should jonction type change on display', () => {
        component.onJunctionTypeChange();
        if (component.currentTool instanceof LineTool) {
            expect(component.currentTool.junctionType).toEqual(component.junctionForm.controls.junctionType.value);
            expect(showcase.display).toHaveBeenCalled();
        }
    });
});
