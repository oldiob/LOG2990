import { SVGAirbrush } from 'src/services/svg/element/svg.airbrush';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';

describe('SVGAirbrush', () => {
    let renderer: any;
    let airbrush: SVGAirbrush;
    let event: MouseEvent;
    let X: number;
    let Y: number;
    const DEFAULT_RATE = 15;
    const DEFAULT_DIAMETER = 5;
    const COLOR = '000000';
    let points: number[][];
    let width: number;
    beforeEach(() => {
        X = Math.random() * 1000;
        Y = Math.random() * 1000;
        event = new MouseEvent('click');
        event.svgX = 1;
        event.svgY = 1;
        width = DEFAULT_DIAMETER;
        points = [[100, 200], [300, 400]];
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
        DOMRenderer.renderer = renderer;
        airbrush = new SVGAirbrush(event.svgX, event.svgY, width);
    });

    it('should exits', () => {
        expect(airbrush).toBeTruthy();
    });

    it('should call appendChild with the given rate when spray', () => {
        spyOn(DOMRenderer, 'appendChild');
        (airbrush as any).spray(DEFAULT_RATE, DEFAULT_DIAMETER, 0, 0);
        expect(DOMRenderer.appendChild).toHaveBeenCalledTimes(DEFAULT_RATE);
    });

    it('should give a random point within the give diameter', () => {
        const point = (airbrush as any).getRandomPointCercle(0, 0, DEFAULT_DIAMETER);
        expect(point).toBeTruthy();
    });

    it('should return false if (x,y) is in nowhere the ink drew', () => {
        expect(airbrush.isIn(X, Y, width)).toBeFalsy();
    });

    it('should return empty string to get primary color', () => {
        expect(airbrush.getPrimary()).toEqual('');
    });

    it('should return empty string to get secondary color', () => {
        expect(airbrush.getSecondary()).toEqual('');
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

    it('should return a random value less than the give max', () => {
        const value = airbrush.getRandom(50);
        expect(value).toBeTruthy();
        expect(value).toBeLessThan(50);
    });

    it('should add spray pattern in an array of points', () => {
        spyOn((airbrush as any), 'spray');
        (airbrush as any).points = points;
        airbrush.addSpray(DEFAULT_RATE, width, X, Y);
        points.push([X, Y]);
        expect((airbrush as any).points).toContain([X, Y]);
        expect((airbrush as any).spray).toHaveBeenCalled();
    });

    it('should return false if (x,y) is at adjusted nowwhere the airbrush drew', () => {
        expect((airbrush as any).isAtAdjusted(X, Y)).toBeFalsy();
    });

    it('should return true if (x,y) is at adjusted nowwhere the airbrush drew', () => {
        const pointX = 100;
        const pointY = 200;
        (airbrush as any).points = points;
        (airbrush as any).isAtAdjusted(pointX, pointY);
        isAtLine([pointX, pointY], points[0], points[1], width + 100);
        expect((airbrush as any).isAtAdjusted(pointX, pointY)).toBeTruthy();
    });
});
