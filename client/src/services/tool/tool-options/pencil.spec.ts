import { DOMRenderer } from 'src/utils/dom-renderer';
import { PencilTool } from './pencil';
import { MyInjector } from 'src/utils/injector';

describe('PencilTool', () => {

    let element: any;
    let renderer: any;
    let paletteService: any;
    let pencil: PencilTool;
    let event: MouseEvent;
    let injector: any;

    beforeEach(() => {
        injector = jasmine.createSpyObj('Injector', ['get']);
        element = jasmine.createSpyObj('SVGPencil', ['addPoint', 'setWidth']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        paletteService = jasmine.createSpyObj('PateService', ['getPrimary', 'getSecondary']);
        pencil = new PencilTool(paletteService);
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);

        MyInjector.injector = injector;
        DOMRenderer.renderer = renderer;
    });

    it('should exists', () => {
        expect(pencil).toBeTruthy();
    });

    it('should keep track of a newly created SVGPencil', () => {
        expect(pencil.onPressed(event)).toBeTruthy();
        expect(pencil.element).toBeTruthy();
    });

    it('should add a point to the newly created element', () => {
        pencil.element = element;
        pencil.onMotion(event);
        expect(element.addPoint).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

    it('should do nothing on motion if no element is selected', () => {
        pencil.element = null;
        pencil.onMotion(event);
        expect(element.addPoint).not.toHaveBeenCalled();
    });

    it('should loose reference to the newly created element when released', () => {
        pencil.onReleased(event);
        expect(pencil.element).toBe(null);
    });
});
