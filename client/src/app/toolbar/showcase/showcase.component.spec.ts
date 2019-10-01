import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseComponent } from './showcase.component';

describe('ShowcaseComponent', () => {
    let component: ShowcaseComponent;
    let fixture: ComponentFixture<ShowcaseComponent>;
    let svgService: any;
    let entry: any;
    let mouseEvent: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShowcaseComponent]
        })
        .compileComponents();
    }));

    beforeEach(() => {
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
        let tool = jasmine.createSpyObj('ITool', ['onPressed', 'onMotion', 'onReleased']);
        component.display(tool);

        expect(tool.onPressed).toHaveBeenCalledTimes(1);
        expect(tool.onMotion).toHaveBeenCalledTimes(Math.round((component.MAX - component.MIN) / component.STEP));
        expect(tool.onReleased).toHaveBeenCalledTimes(1);
        expect(svgService.addObject).toHaveBeenCalledTimes(1);
    });

    it('should return if service is undefined', () => {
        let tool = jasmine.createSpyObj('ITool', ['onPressed', 'onMotion', 'onReleased']);

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
