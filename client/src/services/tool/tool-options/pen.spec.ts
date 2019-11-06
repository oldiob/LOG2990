import { DOMRenderer } from 'src/utils/dom-renderer';
import { PenTool } from './pen';

describe('PenTool', () => {

    let element: any;
    let renderer: any;
    let paletteService: any;
    let pen: PenTool;
    let event: MouseEvent;

    beforeEach(() => {
        element = jasmine.createSpyObj('SVGPen', ['setPrimary', 'setWidth', 'isAt', 'isIn', 'addAnchor',
        'setCursor']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        DOMRenderer.renderer = renderer;
        pen = new PenTool(paletteService);
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(pen).toBeTruthy();
    });

    it('should do nothing on motion if no element is selected', () => {
        pen.element = null;
        pen.onMotion(event);
        expect(element.addAnchor).not.toHaveBeenCalled();
    });

    it('should loose reference to the newly created element when released', () => {
        pen.onReleased(event);
        expect(pen.element).toBe(null);
    });

    it('should call addAnchor when it is onPressed', () => {
        pen.element = element;
        pen.onPressed(event);
        expect(element.addAnchor).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

    it('should call addAnchor when it is onMotion', () => {
        pen.element = element;
        pen.onMotion(event);
        expect(element.addAnchor).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

});
