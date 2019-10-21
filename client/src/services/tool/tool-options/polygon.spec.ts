import { PolygonTool } from './polygon';

describe('PolygonTool', () => {

    let element: any;
    let renderer: any;
    let rendererProvider: any;
    let paletteService: any;

    let polygon: PolygonTool;
    let event: MouseEvent;

    beforeEach(() => {
        element = jasmine.createSpyObj('SVGPolygon', ['addPoint', 'setWidth', 'setCursor', 'release']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        rendererProvider = jasmine.createSpyObj('RendererProviderService', renderer);
        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        rendererProvider.renderer = renderer;
        polygon = new PolygonTool(paletteService);
        polygon.element = element;
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(polygon).toBeTruthy();
    });

    it('should create new rect when onPressed', () => {
        polygon.element = element;
        expect((): any => polygon.onPressed(event)).toBeTruthy();
        expect(polygon.element).toBeTruthy();
    });

    it('should set element to null when OnReleased', () => {
        polygon.onReleased(event);
        expect(polygon.element).toBeNull();
        expect(element.release).toHaveBeenCalled();
    });

    it('should set cursor with proper parameter when OnMotion', () => {
        polygon.element = element;
        polygon.onMotion(event);
        expect(element.setCursor).toHaveBeenCalled();
    });

    it('should do nothing if no element is been manipulated', () => {
        polygon.element = null;
        polygon.onMotion(event);
        expect(element.setCursor).not.toHaveBeenCalled();
    });
});
