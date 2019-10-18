import { RectangleTool } from './rectangle';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';

describe('RectangleTool', () => {

    let element: any;
    let renderer: any;
    let paletteService: any;

    let rectangle: RectangleTool;
    let event: MouseEvent;

    beforeEach(() => {
        element = jasmine.createSpyObj('SVGRect', ['addPoint', 'setWidth', 'setCursor', 'release']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        paletteService = jasmine.createSpyObj('PateService', ['getPrimary', 'getSecondary']);

        RendererProvider.renderer = renderer;
        rectangle = new RectangleTool(paletteService);
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
        expect((): any => { return rectangle.onPressed(event); }).toBeTruthy();
        expect(rectangle.element).toBeTruthy();
    });

    it('should set element to null when OnReleased', () => {
        rectangle.onReleased(event);
        expect(rectangle.element).toBeNull();
        expect(element.release).toHaveBeenCalled();
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
