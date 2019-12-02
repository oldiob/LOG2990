import { JunctionType, LineType } from 'src/services/tool/tool-options/i-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';
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
    let anchors: number[][];
    let event: MouseEvent;
    let width: number;
    beforeEach(() => {
        event = new MouseEvent('click');
        width = 5;
        junctionWidth = 12;
        junctionType = JunctionType.Angle;
        X = Math.random() * 1000;
        Y = Math.random() * 1000;
        R = Math.random() * 1000;
        C = `#(Math.floor(Math.random() * 1000)).toString(16)`;
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild', 'removeChild']);
        DOMRenderer.renderer = renderer;

        line = new SVGLine(event.svgX, event.svgY, width, junctionWidth, lineType, junctionType);
    });

    it('should exits', () => {
        expect(line).toBeTruthy();
        expect(renderer.createElement).toHaveBeenCalled();
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should return false if (x,y) is nowhere the line drew', () => {
        expect(line.isAt(X, Y)).toBeFalsy();
    });

    it('should return false the isIn is called', () => {
        expect(line.isIn(X, Y, R)).toBeFalsy();
    });

    it('should get empty string when the secondary is get', () => {
        expect(line.getSecondary()).toEqual('');
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
        width = Math.random() * 1000;
        line.setWidth(width);
        expect((line as any).width).toEqual(width);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should popAnchor last element', () => {
        line.popAnchor();
        expect(line.anchors.pop()).toBeUndefined();
    });

    it('should select angle junction', () => {
        (line as any).selectJunctionType(X, Y, junctionType, junctionWidth);
        expect(renderer.setAttribute).toHaveBeenCalled();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

    it('should select full line', () => {
        lineType = LineType.FullLine;
        (line as any).selectLineType(lineType, width);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should select dash line', () => {
        lineType = LineType.DashLine;
        (line as any).selectLineType(lineType, width);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should select dot line', () => {
        lineType = LineType.DotLine;
        (line as any).selectLineType(lineType, width);
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should return false if (x,y) is at adjusted nowwhere the airbrush drew', () => {
        expect((line as any).isAtAdjusted(X, Y)).toBeFalsy();
    });

    it('should return true if (x,y) is at line in the airbrush drew', () => {
        const pointX = 300;
        const pointY = 400;
        anchors = [[300, 400], [10, 100], [200, 500]];
        line.anchors = anchors;
        expect(isAtLine([pointX, pointY], anchors[0], anchors[1], width)).toBeTruthy();
    });

});
