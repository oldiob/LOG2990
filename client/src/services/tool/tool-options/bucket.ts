import { Injectable } from '@angular/core';

/*import { PaletteService } from 'src/services/palette/palette.service';
import { SVGInterface } from 'src/services/svg/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';
*/
import { ITool } from './i-tool';
import { SVGService } from 'src/services/svg/svg.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';

@Injectable({
    providedIn: 'root',
})
export class Bucket implements ITool {
    FILENAME: string = "bucket.png";

    // No need to use any Color logic in this class, just return the SVGInterface implementations
    constructor(private svgService: SVGService) { }

    onPressed(event: MouseEvent): SVGInterface | null {
        const x: number = event.clientX;
        const y: number = event.clientY;

        const obj: SVGInterface | null = this.svgService.findAt(x, y);
        if (obj != null) {
            return obj;
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
