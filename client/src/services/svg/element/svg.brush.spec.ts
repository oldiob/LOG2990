import { SVGBrush } from './svg.brush';
import { ITexture } from './texture/i-texture';

fdescribe('SVGBrush', () => {

    let renderer: any;
    let brush: SVGBrush;
    let X: number;
    let Y: number;
    let R: number;
    let C: string;
    let width: number;
    let texture: ITexture;

    beforeEach(() => {
        X = Math.random() * 1000;
        Y = Math.random() * 1000;
        R = Math.random() * 1000;
        C = `#(Math.floor(Math.random() * 1000)).toString(16)`;
        width = 1;
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        brush = new SVGBrush(renderer, width, texture);
    });

    it('should exits', () => {
        expect(brush).toBeTruthy();
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should return true only if (x,y) is at where the pencil drew', () => {

        brush.points.push([X, Y]);
        expect(brush.isAt(X, Y)).toBeTruthy();

        brush.lineWidth = 16;
        brush.points.push([X + 4, Y]);
        expect(brush.isAt(X + 8, Y + 0.5)).toBeFalsy();

    });

    it('should return false if (x,y) is nowhere the pencil drew', () => {
        expect(brush.isAt(X, Y)).toBeFalsy();
    });

    it('should return true if the circle (x, y, r) touch one of the point drew by the pencil', () => {
        expect(brush.isIn(X, Y, R)).toBeTruthy();
    });

    it('should set the primary color', () => {
        brush.setPrimary(C);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should not set the secondary color', () => {
        brush.setSecondary(C);
        expect(renderer.setAttribute).not.toHaveBeenCalled();
    });

    it('should set width', () => {
        const width = Math.random() * 1000;
        brush.setWidth(width);
        expect(brush.lineWidth).toEqual(width);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should add point to the points list', () => {
        brush.addPoint(X, Y);
        expect(brush.points).toContain([X, Y]);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

});
