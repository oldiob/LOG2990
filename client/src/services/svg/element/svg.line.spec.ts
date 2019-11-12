import { JunctionType, LineType } from 'src/services/tool/tool-options/i-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';
// import { Point } from 'src/utils/geo-primitives';
import { SVGLine } from './svg.line';

describe('SVGLine', () => {
    let renderer: any;
    let line: SVGLine;
    let X: number;
    let Y: number;
    let R: number;
    let C: string;
    let junctionWidth: number;
    let junctionType: JunctionType;
    let lineType: LineType;
    let event: MouseEvent;
    beforeEach(() => {
        event = new MouseEvent('click');
        junctionWidth = 12;
        lineType = LineType.FullLine;
        junctionType = JunctionType.Angle;
        X = Math.random() * 1000;
        Y = Math.random() * 1000;
        R = Math.random() * 1000;
        C = `#(Math.floor(Math.random() * 1000)).toString(16)`;
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
        DOMRenderer.renderer = renderer;

        line = new SVGLine(event.svgX, event.svgY, junctionWidth, lineType, junctionType);
    });

    it('should exits', () => {
        expect(line).toBeTruthy();
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalled();
    });
/*
    it('should return true only if (x,y) is at where the line drew', () => {

        line.width = 16;
        line.anchors.push(new Point(X, Y));
        line.anchors.push(new Point(X + 4, Y));
        expect(line.isAt(X, Y)).toBeTruthy();
        expect(line.isAt(X - 40000, Y - 80000)).toBeFalsy();

    });
*/
    it('should return false if (x,y) is nowhere the line drew', () => {
        expect(line.isAt(X, Y)).toBeFalsy();
    });

    it('should return false the isIn is called', () => {
        expect(line.isIn(X, Y, R)).toBeFalsy();
    });

    it('should set the primary color', () => {
        renderer.setAttribute.calls.reset();
        const circleChild = jasmine.createSpyObj('any', ['nodeName']);
        const nonCircleChild = jasmine.createSpyObj('any', ['nodeName']);

        const children = [circleChild, nonCircleChild];
        const element = jasmine.createSpyObj('any', ['children']);

        element.children = children;
        line.element = element;

        line.setPrimary(C);
        expect(renderer.setAttribute).toHaveBeenCalledTimes(2);
    });

    it('should not set the secondary color', () => {
        renderer.setAttribute.calls.reset();
        line.setSecondary(C);
        expect(renderer.setAttribute).not.toHaveBeenCalled();
    });

    it('should set width', () => {
        const width = Math.random() * 1000;
        line.setWidth(width);
        expect(line.width).toEqual(width);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should renderer full line with angle junction', () => {
        expect(renderer.setAttribute).toHaveBeenCalledTimes(4);
        expect(renderer.createElement).toHaveBeenCalledTimes(2);
        expect(renderer.appendChild).toHaveBeenCalledTimes(2);
    });

    it('should popAnchor last element', () => {
        line.popAnchor();
        expect(line.anchors.pop()).toBeUndefined();
    });
/*
    it('should add point to the anchors list', () => {
        line.addAnchor(X, Y, junctionType);
        const anchorsSpy = new Point(X, Y);
        expect(line.anchors).toContain(anchorsSpy);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });
*/
    it('should add circle when it is dot junction', () => {
        const polyline = jasmine.createSpyObj('any', ['attributes']);
        const attributes = jasmine.createSpyObj('any', ['stroke']);
        const stroke = jasmine.createSpyObj('any', ['nodeValue']);
        const nodeValue = jasmine.createSpyObj('any', ['']);
        polyline.attributes = attributes;
        attributes.stroke = stroke;
        stroke.nodeValue = nodeValue;

        line.polyline = polyline;
        junctionType = JunctionType.Dot;
        line.addAnchor(X, Y, junctionType);
        expect(renderer.setAttribute).toHaveBeenCalled();
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

});
