import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGBrush } from './svg.brush';

describe('SVGBrush', () => {

    let renderer: any;
    let brush: SVGBrush;
    let X: number;
    let Y: number;
    let C: string;
    let width: number;
    let texture: any;
    texture = jasmine.createSpyObj('ITexture', ['create', 'addPoint']);

    beforeEach(() => {
        X = Math.random() * 1000;
        Y = Math.random() * 1000;
        C = `#(Math.floor(Math.random() * 1000)).toString(16)`;
        width = 1;
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        DOMRenderer.renderer = renderer;

        brush = new SVGBrush(width, texture);
        (brush as any).texture = texture;
    });

    it('should exits', () => {
        expect(brush).toBeTruthy();
        expect(texture.create).toHaveBeenCalled();
    });

    it('should return false if (x,y) is nowhere the pencil drew', () => {
        expect(brush.isAt(X, Y)).toBeFalsy();
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
        const width2 = Math.random() * 1000;
        (brush as any).setWidth(width2);
        expect(brush.lineWidth).toEqual(width2);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

});
