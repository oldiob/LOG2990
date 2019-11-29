import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGPencil } from './svg.pencil';

describe('SVGPencil', () => {

    let renderer: any;
    let pencil: SVGPencil;
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
        DOMRenderer.renderer = renderer;

        pencil = new SVGPencil();
    });

    it('should exits', () => {
        expect(pencil).toBeTruthy();
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should return true only if (x,y) is at where the pencil drew', () => {

        pencil.lineWidth = 16;
        pencil.points.push([X, Y]);
        pencil.points.push([X + 4, Y]);
        expect(pencil.isAt(X, Y)).toBeTruthy();
        expect(pencil.isAt(X - 40, Y - 80)).toBeFalsy();

    });

    it('should return false if (x,y) is nowhere the pencil drew', () => {
        expect(pencil.isAt(X, Y)).toBeFalsy();
    });

    it('should return true if the circle (x, y, r) touch one of the point drew by the pencil', () => {
        expect(pencil.isIn(X, Y, R)).toBeFalsy();
    });

    it('should set the primary color', () => {
        renderer.setAttribute.calls.reset();
        pencil.setPrimary(C);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should not set the secondary color', () => {
        renderer.setAttribute.calls.reset();
        pencil.setSecondary(C);
        expect(renderer.setAttribute).not.toHaveBeenCalled();
    });

    it('should set width', () => {
        const width = Math.random() * 1000;
        pencil.setWidth(width);
        expect(pencil.lineWidth).toEqual(width);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should add point to the points list', () => {
        pencil.addPoint(X, Y);
        /*
        TODO:

        expect(pencil.points).toContain([X, Y]);
        expect(renderer.setAttribute).toHaveBeenCalled();
        */
    });

});
