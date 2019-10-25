import { Injectable } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';

import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class EraserTool implements ITool {

    activated: boolean;
    width: number;

    objectOnHold: SVGInterface | null;

    constructor(private svgService: SVGService) {
        this.activated = false;
        this.width = 64;
    }

    onPressed(event: MouseEvent): null {
        this.activated = true;
        this.svgService.removeObject(this.objectOnHold);
        return null;
    }

    onReleased(event: MouseEvent): void {
        this.activated = false;
    }

    onMotion(event: MouseEvent): void {
        const x: number = event.svgX;
        const y: number = event.svgY;

        this.objectOnHold = this.svgService.findIn(x, y, this.width);

        if (this.activated) {
            this.svgService.removeObject(this.objectOnHold);
        }
    }
}
