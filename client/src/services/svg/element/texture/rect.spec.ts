import { RectTexture } from './rect';
import { DOMRenderer } from 'src/utils/dom-renderer';

describe('RectTexture', () => {

    let rect: RectTexture;
    let brush: any;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        brush = jasmine.createSpyObj('SVGBrush', ['lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        element = jasmine.createSpyObj('any', ['']);

        DOMRenderer.renderer = renderer;
        rect = new RectTexture();
    });

    it('should exists', () => {
        expect(rect).toBeTruthy();
    });

    it('should create blur element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        rect.create(brush);
        expect(brush.element).toEqual(element);
        expect(renderer.createElement).toHaveBeenCalled();
    });

    it('should add point to a blur element', () => {
        rect.addPoint(brush, 0, 0);
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalledTimes(4);
        expect(renderer.appendChild).toHaveBeenCalled();
    });
});
