import { CircleTexture } from './circle';
import { DOMRenderer } from 'src/utils/dom-renderer';

describe('CircleTexture', () => {

    let circle: CircleTexture;
    let brush: any;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        brush = jasmine.createSpyObj('SVGBrush', ['lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        element = jasmine.createSpyObj('any', ['']);

        DOMRenderer.renderer = renderer;
        circle = new CircleTexture();
    });

    it('should exists', () => {
        expect(circle).toBeTruthy();
    });

    it('should create blur element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        circle.create(brush);
        expect(brush.element).toEqual(element);
        expect(renderer.createElement).toHaveBeenCalled();
    });

    it('should add point to a blur element', () => {
        circle.addPoint(brush, 0, 0);
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalledTimes(4);
        expect(renderer.appendChild).toHaveBeenCalled();
    });
});
