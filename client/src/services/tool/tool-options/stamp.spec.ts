import { DOMRenderer } from 'src/utils/dom-renderer';
import { StampTool } from './stamp';
import { MyInjector } from 'src/utils/injector';

describe('StampTool', () => {

    const element = jasmine.createSpyObj('SVGStamp', ['addPoint', 'setCursor']);
    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
    const injector = jasmine.createSpyObj('MyInjector', ['get']);
    const svg = jasmine.createSpyObj('SVGService', ['addObject', 'removeObject'])
    injector.get.and.returnValue(svg);
    const iStamp = jasmine.createSpyObj('IStamp', ['create', 'addPoint']);
    let stamp: StampTool;
    let event: MouseEvent;

    beforeEach(() => {
        DOMRenderer.renderer = renderer;
        MyInjector.injector = injector;
        stamp = new StampTool();
        stamp.stampTexture = iStamp;
        event = new MouseEvent('mousedown');
    });

    it('should create', () => {
        expect(stamp).toBeTruthy();
    });

    it('should create new stamp when onPressed', () => {
        stamp.onPressed(event);
        expect(svg.addObject).toHaveBeenCalled();
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
