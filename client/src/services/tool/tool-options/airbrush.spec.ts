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
        element = jasmine.createSpyObj('SVGBrush', ['setPrimary', 'setWidth', 'isAt', 'isIn', 'addAnchor',
            'setCursor', 'lineLoop', 'finish', 'end', 'popAnchor']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);

        DOMRenderer.renderer = renderer;
        airbrush = new AirbrushTool(paletteService);
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

    it('should on motion', () => {
        airbrush.onMotion(event);
        expect(airbrush.currentX).toEqual(event.svgX);
        expect(airbrush.currentY).toEqual(event.svgY);
    });

    it('should on released', () => {
        airbrush.onReleased(event);
        expect(airbrush.element).toBeFalsy();
    });

    it('should set rate', () => {
        airbrush.setRate(1);
        expect(airbrush.rate).toBe(1);
    });

});
