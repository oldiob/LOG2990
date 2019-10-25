import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { CmdBucket } from 'src/services/cmd/cmd.bucket';
import { SVGService } from 'src/services/svg/svg.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';

import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class BucketTool implements ITool {

    constructor(private svgService: SVGService,
        private paletteService: PaletteService) { }

    onPressed(event: MouseEvent): CmdBucket {
        const x: number = event.svgX;
        const y: number = event.svgY;
        let primary: boolean = true;
        let color: string = '';

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
                return;
        }
        const obj: SVGInterface | null = this.svgService.findAt(x, y);
	let cmd: CmdBucket;
        if (obj) {
            cmd = new CmdBucket(obj, color, primary);
        }
	return cmd;
    }
}
