import { Injectable } from '@angular/core';
import { CmdBucket } from 'src/services/cmd/cmd.bucket';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGAbstract } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';

import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class BucketTool implements ITool {

    readonly tip: string;

    constructor(private svgService: SVGService,
        private paletteService: PaletteService) {
        this.tip = 'Bucket (B)';
    }

    onPressed(event: MouseEvent): CmdBucket | null {
        const x: number = event.svgX;
        const y: number = event.svgY;
        let primary = true;
        let color = '';

        switch (event.button) {
            case 0:
                primary = true;
                color = this.paletteService.getPrimary();
                break;

            case 2:
                primary = false;
                color = this.paletteService.getSecondary();
                break;

            default:
                return null;
        }
        const obj: SVGAbstract | null = this.svgService.findAt(x, y);
        if (!obj) {
            return null;
        }
        return new CmdBucket(obj, color, primary);
    }

    onMotion(event: MouseEvent): void {
        //
    }
    onReleased(event: MouseEvent): void {
        //
    }

    onShowcase(): null {
        return null;
    }
}
