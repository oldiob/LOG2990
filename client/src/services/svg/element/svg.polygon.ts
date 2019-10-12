import { Renderer2 } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';

export class SVGPolygon implements SVGInterface {
    element: any;

    startingPoint: number[];
    fill: number;
    stroke: number;

    pointSize: number;

    private circularPoints: number[][];

    constructor(x: number, y: number, nSides: number, private renderer: Renderer2) {
        this.startingPoint = [x, y];

        this.element = this.renderer.createElement('polygon', 'svg');
        this.renderer.setAttribute(this.element, 'fill', 'none');
        this.renderer.setAttribute(this.element, 'x', `${this.startingPoint[0]}`);
        this.renderer.setAttribute(this.element, 'y', `${this.startingPoint[1]}`);

        const angleBetweenCorners = 2 * Math.PI / nSides;
        for (let i = 0; i < nSides; i++) {
            this.circularPoints.push([Math.cos(i * angleBetweenCorners), Math.sin(i * angleBetweenCorners)]);
        }
    }

    isAt(x: number, y: number): boolean {
        return false;
    }

    isIn(x: number, y: number, r: number): boolean {
        return false;
    }

    setPrimary(color: string): void {
        if (this.fill) {
            this.renderer.setAttribute(this.element, 'fill', color);
        }

    }
    setSecondary(color: string): void {
        if (this.stroke) {
            this.renderer.setAttribute(this.element, 'stroke', color);
        }
    }

    setPointSize(pointSize: number): void {
        this.pointSize = pointSize;
        this.renderer.setAttribute(this.element, 'stroke-width', this.pointSize.toString());
    }

    setTraceType(traceType: TraceType): void {
        switch (traceType) {
            case TraceType.BorderOnly:
                this.fill = 0;
                this.stroke = 1;
                break;
            case TraceType.FillOnly:
                this.fill = 1;
                this.stroke = 0;
                break;
            case TraceType.FillAndBorder:
                this.fill = 1;
                this.stroke = 1;
                break;
        }

        this.renderer.setAttribute(this.element, 'fill-opacity', `${this.fill}`);
        this.renderer.setAttribute(this.element, 'stroke-opacity', `${this.stroke}`);
    }

    setCursor(x: number, y: number) {
        // you habe your this.circularPoints :
        //      a centered Polygon corner positions of radius 1;

        // you have this.startingPoint :
        //      position of the spot what you clicked to create the shape;

        // use maths to transform those 'local' points to the global scale
        // you have some vector functions in src/utils/math.ts
    }
}
