import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { AirbrushTool } from './airbrush';

describe('AirbrushTool', () => {
    let element: any;
    let renderer: any;
    let paletteService: any;
    let airbrush: AirbrushTool;
    let event: MouseEvent;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        element = jasmine.createSpyObj('SVGAirbrush', ['setPrimary', 'setWidth', 'isAt', 'isIn', 'addAnchor',
            'setCursor', 'lineLoop', 'finish', 'end', 'popAnchor', 'addSpray']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);

        DOMRenderer.renderer = renderer;
        airbrush = new AirbrushTool(paletteService);
        airbrush.element = element;
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        airbrush.element = element;
        expect(airbrush).toBeTruthy();
    });

    it('should return a cmd correctly onPressed', () => {
        const cmd = airbrush.onPressed(event);
        airbrush.onReleased(event);
        expect(cmd).toBeTruthy();
    });

    it('should create a SVGAirbrush with given parameter onPressed', () => {
        airbrush.onPressed(event);
        expect(airbrush.element).toBeTruthy();
        expect((airbrush as any).currentX).toEqual(event.svgX);
        expect((airbrush as any).currentY).toEqual(event.svgY);
    });

    it('should set currentX and currentY on mouse motion', () => {
        airbrush.onMotion(event);
        expect((airbrush as any).currentX).toEqual(event.svgX);
        expect((airbrush as any).currentY).toEqual(event.svgY);
    });

    it('should set width to default when undefined on mouse motion', () => {
        const DEFAULT_DIAMETER = 5;
        airbrush.onMotion(event);
        if (airbrush.width !== undefined) {
            expect(airbrush.width).toBe(DEFAULT_DIAMETER);
        }
    });

    it('should call spray on mouse motion', () => {
        airbrush.onMotion(event);
        if (airbrush.element) {
            expect(element.addSpray).toHaveBeenCalled();
        }
    });

    it('should clear current element on mouse released', () => {
        airbrush.onReleased(event);
        expect(airbrush.element).toBeFalsy();
    });

    it('should set rate with the given value', () => {
        airbrush.setRate(1);
        expect((airbrush as any).rate).toBe(1);
    });

});
