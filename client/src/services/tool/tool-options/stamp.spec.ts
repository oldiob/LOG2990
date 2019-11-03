import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { StampTool } from './stamp';

describe('StampTool', () => {

    const element = jasmine.createSpyObj('SVGStamp', ['addPoint', 'setCursor']);
    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
    const iStamp = jasmine.createSpyObj('IStamp', ['create', 'addPoint']);
    let stamp: StampTool;
    let event: MouseEvent;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        DOMRenderer.renderer = renderer;
        stamp = new StampTool();
        stamp.stampTexture = iStamp;
        event = new MouseEvent('mousedown');
    });

    it('should create', () => {
        expect(stamp).toBeTruthy();
    });

    it('should create new stamp when onPressed', () => {
        expect(stamp.onPressed(event)).toBeTruthy();
    });

    it('should set element to null when OnReleased', () => {
        stamp.element = element;
        stamp.onReleased(event);
        expect(stamp.element).toBeNull();
    });

    it('should return true when it is on wheel', () => {
        const wheelEvent = new WheelEvent('wheel');
        stamp.onWheel(wheelEvent);
        expect(stamp.onWheel).toBeTruthy();
    });
});
