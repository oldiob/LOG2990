import { BlurTexture } from './blur';

fdescribe('PencilService', () => {

    let blur: BlurTexture;
    let brush = jasmine.createSpyObj('SVGBrush', ['renderer', 'lineWidth']);
    let renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
    let element = jasmine.createSpyObj('any', ['']);

    beforeEach(() => {
        brush.renderer = renderer;
        brush.lineWidth = 1.0;

        blur = new BlurTexture();
    });

    it('should exists', () => {
        expect(blur).toBeTruthy();
    });

    it('should create blur element', () => {
        renderer.createElement = jasmine.createSpy().and.returnValue(element);
        blur.create(brush);
        expect(brush.element).toEqual(element);
    });

    it('should add point to a blur element', () => {

    });
});
