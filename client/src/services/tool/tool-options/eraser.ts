import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';

import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class EraserTool implements ITool {

    activated: boolean;
    width: number;

    constructor(private svgService: SVGService) {
        this.activated = false;
        this.width = 1;
    }

    onPressed(event: MouseEvent): null {
        this.activated = true;
        const x: number = event.svgX;
        const y: number = event.svgY;

        const obj: SVGInterface | null = this.svgService.findIn(x, y, this.width);
        

        return null;
    }

    onReleased(event: MouseEvent): void {
        this.activated = false;
    }

    onMotion(event: MouseEvent): void {
        return;
    }
}
