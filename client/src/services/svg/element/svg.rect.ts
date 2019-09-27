import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { Renderer2 } from '@angular/core';

export class SVGRect implements SVGInterface {
    element: any;

    private x: number;
    private y: number;

    private width: number;
    private height: number;

    constructor(x: number, y: number, private renderer: Renderer2) {
        // element that contains the rect
        this.element = this.renderer.createElement('rect', 'svg');
        this.x = x;
        this.y = y;
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
    }
    setSecondary(color: string): void {
        // TODO: set the secondary color attribute here with Rendere2
    }

    addPoint(x: number, y: number): void {
        // do the logic of recalculating the width/height and the new x/y if
        // mouse have moved too much on the left/top

        // also, set the attributes for element
    }

    setWidth(width: number): void {
        // set the line thiccness element attribute here
    }

    toString(): string {
        // leave it as it is
        return '';
    }
}
