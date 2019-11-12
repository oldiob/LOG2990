import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule,
    MatMenuModule, MatOptionModule, MatSelectModule, MatSnackBarModule
} from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { AngleComponent } from '../subcomponent/angle/angle.component';
import { ShowcaseComponent } from '../subcomponent/showcase/showcase.component';
import { WidthComponent } from '../subcomponent/width/width.component';
import { ToolOptionComponent } from './tool-option.component';

describe('ToolOptionComponent', () => {
    let component: ToolOptionComponent;
    let fixture: ComponentFixture<ToolOptionComponent>;
    let renderer: Renderer2;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, MatMenuModule, MatSelectModule, MatDialogModule, FormsModule,
                BrowserAnimationsModule, BrowserDynamicTestingModule,
                ReactiveFormsModule, MatButtonModule, MatCheckboxModule,
                MatOptionModule, MatFormFieldModule, MatSnackBarModule],
            declarations: [ToolOptionComponent, ShowcaseComponent, WidthComponent, AngleComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        DOMRenderer.renderer = renderer;
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);

        fixture = TestBed.createComponent(ToolOptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

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

    it('should select texture for brush', () => {
        component.selectTexture(component.currentTexture);
        component.currentTexture = component.textures[0];
        expect(component.currentTexture).toEqual(component.textures[0]);
    });

    it('should set width of the current tool on display', () => {
        const width = 50;
        component.setWidth(width);
        expect(component.currentTool.width).toEqual(width);
    });
});
