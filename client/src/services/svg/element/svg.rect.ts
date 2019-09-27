import { Renderer2 } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
export class SVGRect implements SVGInterface {
    element: any;

    private x: number;
    private y: number;

    private initialx: number;
    private initialy: number;

    private width: number;
    private height: number;

    private tempWidth: number;
    private tempHeight: number;

    private pointSize: number;
    private strokeOpacity: number;
    private fillOpacity: number;

    constructor(x: number, y: number, private renderer: Renderer2) {
        // element that contains the rect
        this.element = this.renderer.createElement('rect', 'svg');
        this.x = x;
        this.y = y;
        this.initialx = x;
        this.initialy = y;
        this.pointSize = 1;
        this.strokeOpacity = 1;
        this.fillOpacity = 1;

    }

    isAt(x: number, y: number): boolean {
        // find out if x/y is clicked on the rectangle
        return false;
    }

    isIn(x: number, y: number): boolean {
        // TODO: idk wtf this should do, leave it as it is
        return false;
    }

    setPrimary(color: string): void {
        // TODO : set the primary color attribute here with Rendere2
        this.renderer.setAttribute(this.element, 'fill', color);

    }
    setSecondary(color: string): void {
        // TODO: set the secondary color attribute here with Rendere2
        this.renderer.setAttribute(this.element, 'stroke', color);

    }

    addPoint(x: number, y: number): void {
        // do the logic of recalculating the width/height and the new x/y if
        // mouse have moved too much on the left/top

        // also, set the attributes for element

        this.tempWidth = this.initialx - x;
        this.tempHeight = this.initialy - y;

        if (this.tempWidth >= 0) {
            this.setx(this.initialx);
            this.setHeight((Math.abs(this.initialx - x)));
        } else if (this.tempWidth < 0) {
            this.setx(x);
            this.setHeight((Math.abs(this.initialx - x)));
        }

        if (this.tempHeight >= 0) {
            this.sety(this.initialy);
            this.setHeight((Math.abs(this.initialy - y)));
        } else if (this.tempHeight < 0) {
            this.sety(y);
            this.setHeight((Math.abs(this.initialy - y)));
        }

    }

    setx(x: number): void {
        this.x = x;
        this.renderer.setAttribute(this.element, 'attr.x', this.x.toString());
    }

    sety(y: number): void {
        this.y = y;
        this.renderer.setAttribute(this.element, 'attr.y', this.y.toString());
    }

    setWidth(width: number): void {
        // set the width of the rectangle here
        this.width = width;
        this.renderer.setAttribute(this.element, 'attr.width', this.width.toString());
    }

    setHeight(height: number): void {
        // set the height of the rectangle here
        this.height = height;
        this.renderer.setAttribute(this.element, 'attr.height', this.height.toString());
    }

    setPointSize(pointSize: number): void {
        // set the point size of the rectangle here
        this.pointSize = pointSize;
        this.renderer.setAttribute(this.element, 'attr.stroke-width', this.pointSize.toString());
    }

    setFillOpacity(fillOpacity: number): void {
        // set the opacity of the rectangle fill here
        this.fillOpacity = fillOpacity;
    }

    setStrokeOpacity(strokeOpacity: number): void {
        // set the opacity of the rectangle stroke here
        this.strokeOpacity = strokeOpacity;
    }

    setTraceType(traceType: number): void {
        if (traceType === 0) {
            this.setFillOpacity(0);
            this.renderer.setAttribute(this.element, 'attr.fill-opacity', this.fillOpacity.toString());
            this.renderer.setAttribute(this.element, 'attr.stroke-opacity', this.strokeOpacity.toString());
        } else if (traceType === 1) {
            this.setStrokeOpacity(0);
            this.renderer.setAttribute(this.element, 'attr.fill-opacity', this.fillOpacity.toString());
            this.renderer.setAttribute(this.element, 'attr.stroke-opacity', this.strokeOpacity.toString());
        } else if (traceType === 2) {
            this.renderer.setAttribute(this.element, 'attr.fill-opacity', this.fillOpacity.toString());
            this.renderer.setAttribute(this.element, 'attr.stroke-opacity', this.strokeOpacity.toString());
        } else {
            this.setFillOpacity(0);
            this.renderer.setAttribute(this.element, 'attr.fill-opacity', this.fillOpacity.toString());
            this.renderer.setAttribute(this.element, 'attr.stroke-opacity', this.strokeOpacity.toString());
        }
    }

    toString(): string {
        // leave it as it is
        return '';
    }
}
