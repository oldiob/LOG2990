import { RandomCircleTexture } from './random-circle';
import { DOMRenderer } from 'src/utils/dom-renderer';

describe('RandomCircleTexture', () => {

    let circle: RandomCircleTexture;
    let brush: any;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        brush = jasmine.createSpyObj('SVGBrush', ['lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        element = jasmine.createSpyObj('any', ['']);

        DOMRenderer.renderer = renderer;
        circle = new RandomCircleTexture();
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
        expect(renderer.createElement).toHaveBeenCalledTimes(RandomCircleTexture.BRUSH_OBJECT_NUMBER);
        expect(renderer.setAttribute).toHaveBeenCalledTimes(4 * RandomCircleTexture.BRUSH_OBJECT_NUMBER);
        expect(renderer.appendChild).toHaveBeenCalledTimes(RandomCircleTexture.BRUSH_OBJECT_NUMBER);
    });
});
