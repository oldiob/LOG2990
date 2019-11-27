import { Color } from 'src/utils/color';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine, vectorMultiply } from 'src/utils/math';
import { SVGInk } from './svg.ink';

describe('SVGInk', () => {

    let renderer: any;
    let ink: SVGInk;
    let angle: number;
    let X: number;
    let Y: number;
    let width: number;
    let points: number[][];
    let color: Color;
    const RED = 255;
    const GREEN = 255;
    const BLUE = 255;
    const ALPHA = 1;

    beforeEach(() => {
        X = Math.random() * 1000;
        Y = Math.random() * 1000;
        color = new Color(RED, GREEN, BLUE, ALPHA);
        angle = 0;
        width = 25;
        points = [[100, 200], [300, 400]];
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
        DOMRenderer.renderer = renderer;
        ink = new SVGInk(angle, width);

    });

    it('should create', () => {
        expect(ink).toBeTruthy();
    });

    it('should return false if (x,y) is at nowhere the ink drew', () => {
        expect(ink.isAt(X, Y)).toBeFalsy();
    });

    it('should return false if (x,y) is in nowhere the ink drew', () => {
        expect(ink.isIn(X, Y)).toBeFalsy();
    });

    it('should return false if (x,y) is at adjusted nowwhere the ink drew', () => {
        expect(ink.isAtAdjusted(X, Y)).toBeFalsy();
    });

    it('should return true if (x,y) is at adjusted nowwhere the ink drew', () => {
        const pointX = 100;
        const pointY = 200;
        (ink as any).points = points;
        ink.isAtAdjusted(pointX, pointY);
        isAtLine([pointX, pointY], points[0], points[1], width + 100);
        expect(ink.isAtAdjusted(pointX, pointY)).toBeTruthy();
    });

    it('should return empty string to get primary color', () => {
        expect(ink.getPrimary()).toEqual('');
    });

    it('should return empty string to get secondary color', () => {
        expect(ink.getSecondary()).toEqual('');
    });

    it('should set fill and stocke to primary color', () => {
        ink.setPrimary(color.toRGBA());
        expect(renderer.setAttribute).toHaveBeenCalledTimes(2);
    });

    it('should not set the secondary color', () => {
        ink.setSecondary(color.toRGBA());
        expect(ink.setSecondary(color.toRGBA())).toBeUndefined();
    });

    it('should set angle in the drawing path', () => {
        spyOn((ink as any), 'setOffset');
        spyOn((ink as any), 'setPathPoints');
        (ink as any).points = points;
        ink.setAngle(angle);
        expect((ink as any).setOffset).toHaveBeenCalled();
        expect((ink as any).setPathPoints).toHaveBeenCalled();
    });

    it('should add point in the path points', () => {
        spyOn((ink as any), 'setPathPoints');
        (ink as any).points = points;
        ink.addPoint(X, Y);
        points.push([X, Y]);
        expect((ink as any).points).toContain([X, Y]);
        expect((ink as any).setPathPoints).toHaveBeenCalled();
    });

    it('should set offset of the path points', () => {
        (ink as any).setOffset(angle);
        expect((ink as any).radian).toEqual(angle);
        expect((ink as any).angles).toEqual([Math.cos(0), Math.sin(0)]);
        expect((ink as any).offset).toEqual(vectorMultiply((ink as any).angles, width / 2));
    });

    it('should set path points', () => {
        (ink as any).setOffset(angle);
        (ink as any).setPathPoints([X, Y], (ink as any).offset, points, (ink as any).offset);
        expect(renderer.setAttribute).toHaveBeenCalled();
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.appendChild).toHaveBeenCalled();
    });
});
