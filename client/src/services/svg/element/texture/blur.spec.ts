import { DOMRenderer } from 'src/utils/dom-renderer';
import { BlurTexture } from './blur';

describe('BlurTexture', () => {

    let blur: BlurTexture;
    let brush: any;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        brush = jasmine.createSpyObj('SVGBrush', ['lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        element = jasmine.createSpyObj('any', ['']);

        DOMRenderer.renderer = renderer;
        blur = new BlurTexture();
    });

    it('should exists', () => {
        expect(blur).toBeTruthy();
    });

    it('should create blur element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        blur.create(brush);
        expect(brush.element).toEqual(element);
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalledTimes(5);
    });

    it('should add point to a blur element', () => {
        blur.addPoint(brush, 0, 0);
        expect(renderer.setAttribute).toHaveBeenCalledTimes(1);
        expect(brush.pointsAttribute).toHaveBeenCalled();
    });
});
