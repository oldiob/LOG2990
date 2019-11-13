import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { ShowcaseSignal } from 'src/utils/showcase-signal';
import { ShowcaseComponent } from './showcase.component';

describe('ShowcaseComponent', () => {
    let component: ShowcaseComponent;
    let fixture: ComponentFixture<ShowcaseComponent>;
    let svgService: any;
    let entry: any;
    let mouseEvent: any;
    let renderer;
    let subjectSpy: Subject<null>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShowcaseComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        subjectSpy = jasmine.createSpyObj('Subject<null>', ['next']);
        (ShowcaseSignal as any).subject = subjectSpy;

        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        DOMRenderer.renderer = renderer;

        fixture = TestBed.createComponent(ShowcaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        svgService = jasmine.createSpyObj('SVGService', ['entry', 'clearDrawArea', 'addObject', 'clearObjects']);
        entry = jasmine.createSpyObj('ElementRef', ['']);
        mouseEvent = jasmine.createSpyObj('MouseEvent', ['svgX', 'svgY']);

        component.service = svgService;
        component.entry = entry;
        component.mouseEvent = mouseEvent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return if service is undefined', () => {
        const tool = jasmine.createSpyObj('ITool', ['onPressed', 'onMotion', 'onReleased']);

        component.service = null;
        component.display();

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
