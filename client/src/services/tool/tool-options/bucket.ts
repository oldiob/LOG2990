import { Injectable } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class Bucket implements ITool {
    width: number;
    readonly FILENAME = 'bucket.png';
    element: SVGInterface | null;

    constructor(private svgService: SVGService) { }

    onPressed(x: number, y: number): void {
        this.element = this.svgService.findAt(x, y);
    }

    onReleased(x: number, y: number): void {
        return;
    }

    onMotion(x: number, y: number): void {
        return;
    }
}
