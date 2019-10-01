import { PencilTool } from './pencil';

describe('PencilTool', () => {

    const element = jasmine.createSpyObj('SVGPencil', ['addPoint', 'setWidth']);
    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
    const rendererProvider = jasmine.createSpyObj('RendererProviderService', renderer);
    const paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);

    let pencil: PencilTool;
    let event: MouseEvent;

    beforeEach(() => {
        rendererProvider.renderer = renderer;
        pencil = new PencilTool(rendererProvider, paletteService);
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(pencil).toBeTruthy();
    });

    it('should keep track of a newly created SVGPencil', () => {
        pencil.element = element;
        const returnElement = pencil.onPressed(event);
        expect(pencil.element).toBeTruthy();
        expect(returnElement).toBeTruthy();
    });

    it('should add a point to the newly created element', () => {
        pencil.element = element;
        pencil.onMotion(event);
        expect(element.addPoint).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

    it('should do nothing on motion if no element is selected', () => {
        pencil.element = null;
        expect(() => { pencil.onMotion(event); }).toThrow();
    });

    it('should loose reference to the newly created element when released', () => {
        pencil.onReleased(event);
        expect(pencil.element).toBe(null);
    });
});
