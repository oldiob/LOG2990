import { OpacityTexture } from './opacity';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';

describe('OpacityTexture', () => {

    let opacity: OpacityTexture;
    let brush: any;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        brush = jasmine.createSpyObj('SVGBrush', ['lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        element = jasmine.createSpyObj('any', ['']);

        RendererProvider.renderer = renderer;
        opacity = new OpacityTexture();
    });

    it('should exists', () => {
        expect(opacity).toBeTruthy();
    });

    it('should create opacity element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        opacity.create(brush);
        expect(brush.element).toEqual(element);
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalledTimes(5);
    });

    it('should add point to a opacity element', () => {
        opacity.addPoint(brush, 0, 0);
        expect(renderer.setAttribute).toHaveBeenCalledTimes(1);
        expect(brush.pointsAttribute).toHaveBeenCalled();
    });
});
