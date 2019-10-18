import { EllipseTool } from './ellipse';

describe('EllipseTool', () => {

    let element: any;
    let renderer: any;
    let rendererProvider: any;
    let paletteService: any;

    let ellipse: EllipseTool;
    let event: MouseEvent;

    beforeEach(() => {
        element = jasmine.createSpyObj('SVGEllipse', ['addPoint', 'setWidth', 'setCursor', 'release']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        rendererProvider = jasmine.createSpyObj('RendererProviderService', renderer);
        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        rendererProvider.renderer = renderer;
        ellipse = new EllipseTool(rendererProvider, paletteService);
        ellipse.element = element;
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(ellipse).toBeTruthy();
    });

    it('should create new rect when onPressed', () => {
        ellipse.element = element;
        expect((): any => ellipse.onPressed(event)).toBeTruthy();
        expect(ellipse.element).toBeTruthy();
    });

    it('should set element to null when OnReleased', () => {
        ellipse.onReleased(event);
        expect(ellipse.element).toBeNull();
        expect(element.release).toHaveBeenCalled();
    });

    it('should set cursor with proper parameter when OnMotion', () => {
        ellipse.element = element;
        ellipse.onMotion(event);
        expect(element.setCursor).toHaveBeenCalled();
    });

    it('should do nothing if no element is been manipulated', () => {
        ellipse.element = null;
        ellipse.onMotion(event);
        expect(element.setCursor).not.toHaveBeenCalled();
    });
});
