import { Injectable } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class BucketService implements ITool {

    readonly FILENAME: string = "bucket.png";

    constructor(private svgService: SVGService,
        private paletteService: PaletteService,
        private workZoneService: WorkZoneService) { }

    onPressed(event: MouseEvent): null {
        const x: number = event.svgX;
        const y: number = event.svgY;

        const obj: SVGInterface | null = this.svgService.findAt(x, y);
        if (obj != null) {
            if (event.button === 0) {
                obj.setPrimary(this.paletteService.getPrimary());
            } else if (event.button === 2) {
                obj.setSecondary(this.paletteService.getSecondary());
            }
        }
        else if (event.button === 0) {
            this.workZoneService.updateBackgroundColor(this.paletteService.getPrimary());
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
