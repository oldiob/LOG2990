import { RectangleTool } from './rectangle';

describe('RectangleTool', () => {

    const element = jasmine.createSpyObj('SVGRect', ['addPoint', 'setWidth', 'setCursor']);
    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
    const rendererProvider = jasmine.createSpyObj('RendererProviderService', renderer);
    const paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);

    let rectangle: RectangleTool;
    let event: MouseEvent;

    beforeEach(() => {
        rendererProvider.renderer = renderer;
        rectangle = new RectangleTool(rendererProvider, paletteService);
        rectangle.element = element;
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(rectangle).toBeTruthy();
    });

    it('should create new rect when onPressed', () => {
        rectangle.element = element;
        const returnElement = rectangle.onPressed(event);
        expect(rectangle.element).toBeTruthy();
        expect(returnElement).toBeTruthy();
    });

    it('should set element to null when OnRelased', () => {
        rectangle.onReleased(event);
        expect(rectangle.element).toBeNull();
    });

    it('should set cursor with proper parameter when OnMotion', () => {
        rectangle.element = element;
        rectangle.onMotion(event);
        expect(element.setCursor).toHaveBeenCalled();
    });

    it('should do nothing if no element is been manipulated', () => {
        rectangle.element = null;
        rectangle.onMotion(event);
        expect(element.setCursor).not.toHaveBeenCalled();
    });
});
