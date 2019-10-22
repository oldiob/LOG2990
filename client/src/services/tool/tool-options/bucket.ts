import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';

import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class BucketTool implements ITool {

    constructor(private svgService: SVGService,
        private paletteService: PaletteService) { }

    onPressed(event: MouseEvent): null {
        const x: number = event.svgX;
        const y: number = event.svgY;

        const obj: SVGInterface | null = this.svgService.findAt(x, y);
        if (obj !== null) {
            if (event.button === 0) {
                obj.setPrimary(this.paletteService.getPrimary());
            } else if (event.button === 2) {
                obj.setSecondary(this.paletteService.getSecondary());
            }
        }

        return null;
    }

    onReleased(event: MouseEvent): void {
        return;
    }

    onMotion(event: MouseEvent): void {
        return;
    }
}
