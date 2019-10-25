import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGPen } from 'src/services/svg/element/svg.pen';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class PenTool implements ITool {
    width: number;
    element: SVGPen | null;
    minWidth: number;
    maxWidth: number;

    constructor(private paletteService: PaletteService) {
        this.minWidth = 5;
        this.maxWidth = 10;
    }

    onPressed(event: MouseEvent): SVGPen | null {
        if (this.element) {
            return null;
        }
        const x = event.svgX;
        const y = event.svgY;
        this.element = new SVGPen();
        this.element.setWidth(this.maxWidth);
        this.element.setMinWidth(this.minWidth);
        this.element.setMaxWidth(this.minWidth);
        this.element.addPoint(x, y);
        this.element.addPoint(x, y);

        this.element.setPrimary(this.paletteService.getPrimary());

        return this.element;
    }
    onMotion(event: MouseEvent): void {
        if (this.element) {
            const x = event.svgX;
            const y = event.svgY;
            this.element.addPoint(x, y);
        }
    }
    onReleased(event: MouseEvent): void {
        this.element = null;
    }

}
