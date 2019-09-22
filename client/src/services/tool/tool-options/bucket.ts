import { PaletteService } from 'src/app/services/palette/palette.service';
import { SVGInterface } from 'src/app/services/svg/svg.interface';
import { SVGService } from 'src/app/services/svg/svg.service';
import { ITool } from './i-tool';

export class Bucket implements ITool {
  onReleased(event: MouseEvent): void {
    //
  }

    constructor(private svgService: SVGService,
                private paletteService: PaletteService) {

    }
    onPressed(event: MouseEvent): null {
        const x: number = event.clientX;
        const y: number = event.clientY;
        const obj: SVGInterface | null = this.svgService.findAt(x, y);
        if (obj != null) {
            if (event.button == 0) {
                obj.setPrimary(+this.paletteService.getPrimary());
            } else if (event.button == 2) {
                obj.setSecondary(+this.paletteService.getSecondary());
            }
        }
        return null;
    }
    onRelease(event: MouseEvent) {
        return;
    }
    onMotion(event: MouseEvent) {
        return;
    }
}
