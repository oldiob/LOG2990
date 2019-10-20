import { TurbulenceTexture } from './turbulence';
import { DOMRenderer } from 'src/utils/dom-renderer';

describe('OpacityTexture', () => {

    let turbulence: TurbulenceTexture;
    let brush: any;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        brush = jasmine.createSpyObj('SVGBrush', ['lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        element = jasmine.createSpyObj('any', ['']);

        DOMRenderer.renderer = renderer;
        turbulence = new TurbulenceTexture();
    });

    it('should exists', () => {
        expect(turbulence).toBeTruthy();
    });

    it('should create turbulence element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        turbulence.create(brush);
        expect(brush.element).toEqual(element);
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalledTimes(5);
    });

    it('should add point to a turbulence element', () => {
        turbulence.addPoint(brush, 0, 0);
        expect(renderer.setAttribute).toHaveBeenCalledTimes(1);
        expect(brush.pointsAttribute).toHaveBeenCalled();
    });
});
