import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { PencilService } from './pencil';

describe('PencilService', () => {

    const elementSpy = jasmine.createSpyObj('SVGPencil', ['addPoint', 'setWidth']);
    const factory = jasmine.createSpyObj('RendererFactory2', ['createRenderer']);
    let service: PencilService;
    let event: MouseEvent;

    beforeEach(() => {
        service = new PencilService(factory);
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(service).toBeTruthy();
        expect(factory.createRenderer).toHaveBeenCalledWith(null, null);
    });

    it('should keep track of a newly created SVGPencil and return it', () => {
        const element: SVGInterface = service.onPressed(event);
        expect(element).toBeTruthy();
    });

    it('should add a point to the newly created element', () => {
        service.element = elementSpy;
        service.onMotion(event);
        expect(elementSpy.addPoint).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

    it('should do nothing on motion if no element is selected', () => {
        service.element = null;
        expect(() => { service.onMotion(event); }).toThrow();
    });

    it('should loose reference to the newly created element when released', () => {
        service.onReleased(event);
        expect(service.element).toBe(null);
    });
});
