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
        anchors = [[100, 200], [300, 400]];
        width = 25;
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

    it('should create', () => {
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
        spyOn((line as any), 'fullRender');
        spyOn(line.anchors, 'pop');
        line.popAnchor();
        expect(line.anchors.pop).toHaveBeenCalled();
        expect((line as any).fullRender).toHaveBeenCalled();
    });

    it('should select dot junction', () => {
        junctionType = JunctionType.Dot;
        (line as any).junctionWidth = junctionWidth;
        (line as any).selectJunctionType(X, Y, junctionType, junctionWidth);
        expect((line as any).junctionWidth).toEqual(junctionWidth);
        expect(renderer.setAttribute).toHaveBeenCalled();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

    it('should select round junction', () => {
        junctionType = JunctionType.Round;
        (line as any).selectJunctionType(X, Y, junctionType, junctionWidth);
        expect(renderer.setAttribute).toHaveBeenCalled();
        expect(renderer.appendChild).toHaveBeenCalled();
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
        const pointX = 100;
        const pointY = 200;
        line.anchors = anchors;
        (line as any).isAtAdjusted(pointX, pointY);
        isAtLine([pointX, pointY], anchors[0], anchors[1], width + 100);
        expect(isAtLine([pointX, pointY], anchors[0], anchors[1], width + 100)).toBeTruthy();
    });

    it('should full render line', () => {
        spyOn((line as any), 'renderAnchors');
        line.anchors = anchors;
        (line as any).fullRender();
        expect((line as any).renderAnchors).toHaveBeenCalled();
    });

    it('should render anchors of line', () => {
        line.anchors = anchors;
        (line as any).renderAnchors();
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should add anchor if junctiontype is round or angle', () => {
        spyOn((line as any), 'renderAnchors');
        const currentX = 100;
        const currentY = 100;
        line.anchors = anchors;
        line.addAnchor(currentX, currentY, junctionType);
        expect((line as any).renderAnchors).toHaveBeenCalled();
        expect(line.anchors).toContain([currentX, currentY]);
    });

    it('should set cursor', () => {
        spyOn((line as any), 'renderAnchors');
        const currentX = 100;
        const currentY = 100;
        line.setCursor(currentX, currentY);
        expect((line as any).cursor).toEqual([currentX, currentY]);
        expect((line as any).renderAnchors).toHaveBeenCalled();
    });

    it('should finish line', () => {
        const currentX = 100;
        const currentY = 100;
        (line as any).cursor = [currentX, currentY];
        line.anchors = anchors;
        line.anchors.push((line as any).cursor[0], (line as any).cursor[1]);
        line.finish();
        expect(line.anchors).toContain([currentX, currentY]);
    });

    it('should end line', () => {
        spyOn((line as any), 'renderAnchors');
        renderer.setAttribute.calls.reset();
        const circleChild = jasmine.createSpyObj('any', ['nodeName', 'nodeValue']);
        const nonCircleChild = jasmine.createSpyObj('any', ['nodeName', 'nodeValue']);

        const children = [circleChild, nonCircleChild];
        const element = jasmine.createSpyObj('any', ['children']);

        element.children = children;
        line.element = element;
        line.end();
        expect(renderer.removeChild).toHaveBeenCalled();
        expect((line as any).renderAnchors).toHaveBeenCalled();
    });

});
