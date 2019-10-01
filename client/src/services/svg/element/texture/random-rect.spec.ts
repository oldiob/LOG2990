import { RandomRectTexture } from './random-rect';

describe('RandomRectTecture', () => {

    let rect: RandomRectTexture;
    let brush: any;
    let renderer: any;
    let element: any;

    beforeEach(() => {
        brush = jasmine.createSpyObj('SVGBrush', ['renderer', 'lineWidth', 'pointsAttribute']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        element = jasmine.createSpyObj('any', ['']);

        brush.renderer = renderer;
        rect = new RandomRectTexture();
    });

    it('should exists', () => {
        expect(blur).toBeTruthy();
    });

    it('should create blur element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        rect.create(brush);
        expect(brush.element).toEqual(element);
        expect(renderer.createElement).toHaveBeenCalled();
    });

    it('should add point to a blur element', () => {
        rect.addPoint(brush, 0, 0);
        expect(renderer.createElement).toHaveBeenCalledTimes(RandomRectTexture.BRUSH_OBJECT_NUMBER);
        expect(renderer.setAttribute).toHaveBeenCalledTimes(4 * RandomRectTexture.BRUSH_OBJECT_NUMBER);
        expect(renderer.appendChild).toHaveBeenCalledTimes(RandomRectTexture.BRUSH_OBJECT_NUMBER);
    });
});
