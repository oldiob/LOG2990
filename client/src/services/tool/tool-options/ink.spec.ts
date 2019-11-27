import { PaletteService } from 'src/services/palette/palette.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { InkTool } from './ink';

describe('InkTool', () => {

    const element = jasmine.createSpyObj('SVGStamp', ['addPoint', 'setPrimary', 'setAngle']);
    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
    let ink: InkTool;
    let event: MouseEvent;
    let paletteService: PaletteService;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        DOMRenderer.renderer = renderer;
        paletteService = new PaletteService();
        ink = new InkTool(paletteService);
        event = new MouseEvent('mousedown');

    });

    it('should create', () => {
        expect(ink).toBeTruthy();
    });

    it('should create new ink when onPressed', () => {
        expect(ink.onPressed(event)).toBeTruthy();
    });

    it('should add point onMotion', () => {
        ink.element = element;
        ink.onMotion(event);
        expect(element.addPoint).toHaveBeenCalled();
    });

    it('should set element to null when onReleased', () => {
        ink.element = element;
        ink.onReleased(event);
        expect(ink.element).toBeNull();
    });

    it('should return true when it is onWheel', () => {
        const wheelEvent = new WheelEvent('wheel');
        ink.onWheel(wheelEvent);
        expect(ink.onWheel).toBeTruthy();
    });

    it('should set angle to the new angle when it is onWheel', () => {
        ink.element = element;
        const wheelEvent = new WheelEvent('wheel');
        ink.onWheel(wheelEvent);
        expect(element.setAngle).toHaveBeenCalled();
    });
});
