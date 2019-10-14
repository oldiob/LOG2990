/*import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { SVGRect } from './svg.rect';

describe('SVGRect', () => {

    let renderer: any;
    let rect: SVGRect;
    let X: number;
    let Y: number;
    let R: number;
    let C: string;

    beforeEach(() => {
        X = Math.random() * 1000;
        Y = Math.random() * 1000;
        R = Math.random() * 1000;
        C = `#(Math.floor(Math.random() * 1000)).toString(16)`;
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        rect = new SVGRect(X, Y, renderer);
    });

    it('should exits', () => {
        expect(rect).toBeTruthy();
        expect(rect.x1).toEqual(X);
        expect(rect.x2).toEqual(X);
        expect(rect.y1).toEqual(Y);
        expect(rect.y2).toEqual(Y);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should return false when (x,y) is outside of its area', () => {
        rect.x1 = -1;
        rect.y1 = -1;
        rect.x2 = -1;
        rect.y2 = -1;
        expect(rect.isAt(X, Y)).toBeFalsy();
    });

    it('should return true when (x,y) is in its area', () => {
        rect.x1 = X - 1;
        rect.x2 = X + 1;
        rect.y1 = Y - 1;
        rect.y2 = Y + 1;
        expect(rect.isAt(X, Y)).toBeTruthy();
    });

    it('should return false if the circle (x, y, r) doesn\'t touch the area', () => {
        rect.x1 = -1;
        rect.y1 = -1;
        rect.x2 = -1;
        rect.y2 = -1;
        expect(rect.isIn(X, Y, R)).toBeFalsy();
    });

    it('should return true if the circle (x,y,r ) touch the area', () => {
        rect.x1 = X;
        rect.x2 = X + R;
        rect.y1 = Y;
        rect.y2 = Y + R;
        expect(rect.isIn(X, Y, R)).toBeTruthy();
    });

    it('should set the primary color only if the fill opacity is on', () => {
        rect.fill = true;
        rect.setPrimary(C);
        expect(renderer.setAttribute).toHaveBeenCalled();
        rect.fill = false;
        rect.setPrimary(C);
        expect(renderer.setAttribute).not.toHaveBeenCalled();
    });

    it('should set the secondary color only if the stroke opacity is on', () => {
        rect.stroke = true;
        rect.setSecondary(C);
        expect(renderer.setAttribute).toHaveBeenCalled();
        rect.stroke = false;
        rect.setSecondary(C);
        expect(renderer.setAttribute).not.toHaveBeenCalled();
    });

    it('should set the point size', () => {
        const size = Math.random() * 1000;
        rect.setPointSize(size);
        expect(rect.pointSize).toEqual(size);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should set the correct tracetype', () => {
        rect.setTraceType(TraceType.BorderOnly);
        expect(rect.fill).toBeFalsy();
        expect(rect.stroke).toBeTruthy();

        rect.setTraceType(TraceType.FillOnly);
        expect(rect.fill).toBeTruthy();
        expect(rect.stroke).toBeFalsy();

        rect.setTraceType(TraceType.FillAndBorder);
        expect(rect.fill).toBeTruthy();
        expect(rect.stroke).toBeTruthy();
    });

    it('should move it\'s cursor correctly', () => {
        const x1 = X - 1;
        const y1 = Y + 1;
        const x2 = X - 1;
        const y2 = Y + 2;

        rect.setCursor(X, Y, false);
        expect(rect.x2).toEqual(X);
        expect(rect.y2).toEqual(Y);
        expect(renderer.setAttribute).toHaveBeenCalled();

        rect.setCursor(x1, y1, true);
        expect(Math.abs(rect.x1 - rect.x2) === Math.abs(rect.y1 - rect.y2));

        rect.setCursor(x2, y2, true);
        expect(Math.abs(rect.x1 - rect.x2) === Math.abs(rect.y1 - rect.y2));
    });

});
*/