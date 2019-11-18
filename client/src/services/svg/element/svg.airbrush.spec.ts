import { SVGAirbrush } from 'src/services/svg/element/svg.airbrush';
import { DOMRenderer } from 'src/utils/dom-renderer';

describe('SVGAirbrush', () => {
    let renderer: any;
    let airbrush: SVGAirbrush;
    let event: MouseEvent;
    const DEFAULT_RATE = 15;
    const DEFAULT_DIAMETER = 5;
    const COLOR = '000000';
    beforeEach(() => {
        event = new MouseEvent('click');
        event.svgX = 1;
        event.svgY = 1;
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
        DOMRenderer.renderer = renderer;
        airbrush = new SVGAirbrush(event.svgX, event.svgY);
    });

    it('should exits', () => {
        expect(airbrush).toBeTruthy();
    });

    it('should spray', () => {
        spyOn(DOMRenderer, 'appendChild');
        airbrush.spray(DEFAULT_RATE, DEFAULT_DIAMETER, 0, 0);
        expect(DOMRenderer.appendChild).toHaveBeenCalledTimes(DEFAULT_RATE);
    });

    it('should give a random point', () => {
        const point = airbrush.getRandomPointCercle(0, 0, DEFAULT_DIAMETER);
        expect(point).toBeTruthy();
    });

    it('should set the primary color', () => {
        spyOn(DOMRenderer, 'setAttribute');
        airbrush.setPrimary(COLOR);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should not set the secondary color', () => {
        renderer.setAttribute.calls.reset();
        spyOn(DOMRenderer, 'setAttribute');
        airbrush.setSecondary(COLOR);
        expect(renderer.setAttribute).not.toHaveBeenCalled();
    });
});
