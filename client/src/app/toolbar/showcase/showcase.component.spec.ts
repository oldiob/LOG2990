import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DOMRenderer } from 'src/utils/dom-renderer';
import { ShowcaseComponent } from './showcase.component';

describe('ShowcaseComponent', () => {
    let component: ShowcaseComponent;
    let fixture: ComponentFixture<ShowcaseComponent>;
    let svgService: any;
    let entry: any;
    let mouseEvent: any;
    let renderer;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShowcaseComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        DOMRenderer.renderer = renderer;

        fixture = TestBed.createComponent(ShowcaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        svgService = jasmine.createSpyObj('SVGService', ['entry', 'clearDrawArea', 'addObject']);
        entry = jasmine.createSpyObj('ElementRef', ['']);
        mouseEvent = jasmine.createSpyObj('MouseEvent', ['svgX', 'svgY']);

        component.service = svgService;
        component.entry = entry;
        component.mouseEvent = mouseEvent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create the SVG object', () => {
        const tool = jasmine.createSpyObj('ITool', ['onPressed', 'onMotion', 'onReleased']);
        component.display(tool);

        expect(tool.onPressed).toHaveBeenCalled();
        expect(tool.onMotion).toHaveBeenCalled();
        expect(tool.onReleased).toHaveBeenCalled();
        expect(svgService.addObject).toHaveBeenCalled();
    });

    it('should return if service is undefined', () => {
        const tool = jasmine.createSpyObj('ITool', ['onPressed', 'onMotion', 'onReleased']);

        component.service = null;
        component.display(tool);

        expect(tool.onPressed).toHaveBeenCalledTimes(0);
        expect(tool.onMotion).toHaveBeenCalledTimes(0);
        expect(tool.onReleased).toHaveBeenCalledTimes(0);
        expect(svgService.addObject).toHaveBeenCalledTimes(0);
    });

    it('should change the mouse event', () => {
        expect(component.click(1, 4)).toEqual(mouseEvent);
        expect(mouseEvent.svgX).toEqual(1);
        expect(mouseEvent.svgY).toEqual(4);
    });
});
