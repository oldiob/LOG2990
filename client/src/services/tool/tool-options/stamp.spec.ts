import { StampTool } from './stamp';

describe('StampTool', () => {

    const element = jasmine.createSpyObj('SVGStamp', ['addPoint', 'setCursor']);
    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
    const rendererProvider = jasmine.createSpyObj('RendererProviderService', renderer);
    const iStamp = jasmine.createSpyObj('IStamp', ['create', 'addPoint']);
    let stamp: StampTool;
    let event: MouseEvent;

    beforeEach(() => {
        rendererProvider.renderer = renderer;
        stamp = new StampTool(rendererProvider);
        stamp.element = element;
        stamp.stampTexture = iStamp;
        event = new MouseEvent('mousedown');
    });

    it('should create', () => {
        expect(stamp).toBeTruthy();
    });

    it('should create new stamp when onPressed', () => {
        stamp.element = element;
        const returnElement = stamp.onPressed(event);
        expect(stamp.element).toBeTruthy();
        expect(returnElement).toBeTruthy();
    });

    it('should set element to null when OnReleased', () => {
        stamp.onReleased(event);
        expect(stamp.element).toBeNull();
    });

    it('should set element to null when OnMotion', () => {
        stamp.onMotion(event);
        expect(stamp.element).toBeNull();
    });

    it('should do nothing if no element is been manipulated', () => {
        stamp.element = null;
        stamp.onMotion(event);
        expect(element.setCursor).not.toHaveBeenCalled();
    });
});
