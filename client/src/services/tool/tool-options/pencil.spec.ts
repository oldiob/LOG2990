import { PencilTool } from './pencil';

describe('PencilService', () => {

    const element = jasmine.createSpyObj('SVGPencil', ['addPoint', 'setWidth']);
    const rendererProvider = jasmine.createSpyObj('RendererProviderService', ['renderer']);
    const svgService = jasmine.createSpyObj('SVGService', ['addObject']);
    const paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);

    let pencil: PencilTool;
    let event: MouseEvent;

    beforeEach(() => {
        pencil = new PencilTool(rendererProvider, svgService, paletteService);
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(pencil).toBeTruthy();
    });

    it('should keep track of a newly created SVGPencil and return it', () => {
        pencil.onPressed(event);
        expect(pencil.element).toBeTruthy();
        expect(pencil.element).toHaveBeenCalledWith(event.svgX, event.svgY);
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