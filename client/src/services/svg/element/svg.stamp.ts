import { Renderer2 } from '@angular/core';
import { IStamp } from './stamp/i-stamp';
import { SVGInterface } from './svg.interface';

export class SVGStamp implements SVGInterface {
    element: any;

    previousX = 0;
    previousY = 0;

    points: number[][];

    angles: number;
    lineWidth: number;

    stampTexture: IStamp;
    icons: string[];

    constructor(public renderer: Renderer2, width: number, stamp: IStamp, angle: number) {
        this.points = [];
        this.lineWidth = width;
        this.angles = angle;
        this.stampTexture = stamp;
        this.icons = [];
        this.stampTexture.create(this);
        this.icons = ['./assets/images/quiet.png', './assets/images/love.png', './assets/images/kiss.png',
                      './assets/images/bec.png', './assets/images/shade.png'];
    }

    isAt(x: number, y: number): boolean {
        return false;
    }
    isIn(x: number, y: number, r: number): boolean {
        return false;
    }
    setPrimary(color: string): void {
        // No primary for stamp
    }
    setSecondary(color: string): void {
        // No secondary for stamp
    }

    setWidth(width: number): void {
        this.lineWidth = width;
        this.renderer.setAttribute(this.element, 'stroke-width', width.toString());
    }

    addPoint(x: number, y: number): void {
        this.points.push([x, y]);
        this.icons.push('./assets/images/emoji.png');
        this.icons.push('./assets/images/angel.png');
        this.stampTexture.addPoint(this.icons[0], this, x, y);
    }
}
