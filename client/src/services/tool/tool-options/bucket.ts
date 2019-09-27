import { Injectable } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class Bucket implements ITool {
    readonly FILENAME = 'bucket.png';
    element: SVGInterface | null;

    constructor(private svgService: SVGService) { }

    onPressed(event: MouseEvent): void {
        const x: number = event.clientX;
        const y: number = event.clientY;

        this.element = this.svgService.findAt(x, y);
    }

    onReleased(event: MouseEvent): void {
        return;
    }

    onMotion(event: MouseEvent): void {
        return;
    }
}
