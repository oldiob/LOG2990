import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGPen } from './svg.pen';

describe('SVGPen', () => {
    let renderer: any;
    let pen: SVGPen;
    let X: number;
    let Y: number;
    let R: number;
    let C: string;
    let event: MouseEvent;

    beforeEach(() => {
        event = new MouseEvent('click');
        X = Math.random() * 1000;
        Y = Math.random() * 1000;
        R = Math.random() * 1000;
        C = `#(Math.floor(Math.random() * 1000)).toString(16)`;
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
        DOMRenderer.renderer = renderer;

        pen = new SVGPen(event.svgX, event.svgY);
    });

    it('should exits', () => {
        expect(pen).toBeTruthy();
        expect(renderer.createElement).toHaveBeenCalled();
    });

    it('should return false if (x,y) is nowhere the line drew', () => {
        expect(pen.isAt(X, Y)).toBeFalsy();
    });

    it('should return false the isIn is called', () => {
        expect(pen.isIn(X, Y, R)).toBeFalsy();
    });

    it('should set the primary color', () => {
        renderer.setAttribute.calls.reset();
        const child = jasmine.createSpyObj('any', ['nodeName']);

        const children = [child];
        const element = jasmine.createSpyObj('any', ['children']);

        element.children = children;
        pen.element = element;

        pen.setPrimary(C);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should not set the secondary color', () => {
        renderer.setAttribute.calls.reset();
        pen.setSecondary(C);
        expect(renderer.setAttribute).not.toHaveBeenCalled();
    });

    it('should get an empty string when trying to get secondary color', () => {
        const temp = '';
        pen.setSecondary(C);
        expect(pen.getSecondary()).toEqual(temp);
    });

    it('should change the max width', () => {
        renderer.setAttribute.calls.reset();
        const width = Math.random() * 1000;
        pen.setMaxWidth(width);
        expect(pen.maxWidth).toEqual(width);
    });

    it('should change the min width', () => {
        renderer.setAttribute.calls.reset();
        const width = Math.random() * 1000;
        pen.setMinWidth(width);
        expect(pen.minWidth).toEqual(width);
    });

    it('should change the cursor and add an anchor point when addAnchor is called', () => {
        renderer.setAttribute.calls.reset();
        const x = Math.random() * 1000;
        const y = Math.random() * 1000;
        const temp: number[] = [x, y];
        pen.addAnchor(x, y);
        expect(pen.cursor).toEqual(temp);
        expect(pen.anchors[pen.anchors.length - 1]).toEqual(temp);
    });

    it('width should be set at maxWidth if width is greater then maxWidth', () => {
        renderer.setAttribute.calls.reset();
        pen.setMinWidth(25);
        pen.setMaxWidth(25);
        const x = Math.random() * 1000;
        const y = Math.random() * 1000;
        const x2 = x;
        const y2 = y;
        pen.addAnchor(x, y);
        pen.addAnchor(x2, y2);
        expect(pen.width).toEqual(pen.maxWidth);
    });

});
