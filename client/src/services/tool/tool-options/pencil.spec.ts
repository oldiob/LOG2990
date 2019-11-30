/* TODO
 import { SVGPencil } from 'src/services/svg/element/svg.pencil';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { PencilTool } from './pencil';

describe('PencilTool', () => {

    let svgPencil: SVGPencil;
    let element: any;
    let renderer: any;
    let paletteService: any;
    let pencil: PencilTool;
    let event: MouseEvent;
    let injector: any;

    beforeEach(() => {
        injector = jasmine.createSpyObj('Injector', ['get']);
        svgPencil = jasmine.createSpyObj('SVGPencil', ['addPoint', 'setWidth']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        paletteService = jasmine.createSpyObj('PateService', ['getPrimary', 'getSecondary']);
        element = jasmine.createSpyObj('any', ['attributes']);
        MyInjector.injector = injector;
        DOMRenderer.renderer = renderer;
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
        pencil = new PencilTool(paletteService);
        svgPencil.element = element;
        spyOn(svgPencil.element, 'attributes').and.returnValue(element.attributes);
        pencil.element = svgPencil;
    });

    it('should exists', () => {
        expect(pencil).toBeTruthy();
    });

    it('should keep track of a newly created SVGPencil', () => {
        expect(pencil.onPressed(event)).toBeTruthy();
        expect(pencil.element).toBeTruthy();
    });

    it('should add a point to the newly created element', () => {
        pencil.element = svgPencil;
        pencil.onMotion(event);
        expect(svgPencil.addPoint).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

    it('should do nothing on motion if no element is selected', () => {
        pencil.element = null;
        pencil.onMotion(event);
        expect(svgPencil.addPoint).not.toHaveBeenCalled();
    });

    it('should loose reference to the newly created element when released', () => {
        pencil.onReleased(event);
        expect(pencil.element).toBe(null);
    });
});

*/
