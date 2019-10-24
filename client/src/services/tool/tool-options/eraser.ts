import { Injectable } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';

import { ITool } from './i-tool';
import { SVGEllipse } from 'src/services/svg/element/svg.ellipse';
import { TraceType } from './abs-shape-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';

@Injectable({
    providedIn: 'root',
})
export class EraserTool implements ITool {

    circleOfDeath: SVGEllipse;

    activated: boolean;
    width: number;

    objectOnHold: SVGInterface | null;

    constructor(private svgService: SVGService) {
        this.activated = false;
        this.width = 100;

        this.circleOfDeath = new SVGEllipse(0, 0, TraceType.FillAndBorder);
        this.circleOfDeath.setPrimary('white');
        this.circleOfDeath.setSecondary('black');
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

        this.circleOfDeath.startingPoint = [x - this.width / 2, y - this.width / 2];
        this.circleOfDeath.setCursor(x + this.width / 2, y + this.width / 2, true);

        this.objectOnHold = this.svgService.findIn(x, y, this.width);

        if (this.activated) {
            this.svgService.removeObject(this.objectOnHold);
        }
    }

    onSelect() {
        if (this.svgService.entry !== undefined) {
            DOMRenderer.removeChild(this.svgService.entry.nativeElement, this.circleOfDeath.element);
            DOMRenderer.appendChild(this.svgService.entry.nativeElement, this.circleOfDeath.element);
        }
    }
}
