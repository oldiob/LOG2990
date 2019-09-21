import { SVGService } from 'src/app/services/svg/svg.service';
import { PaletteService } from 'src/app/services/palette/palette.service';
import { SVGInterface } from 'src/app/services/svg/svg.interface';
import { ITool } from './i-tool'

extern class Bucket implements Itool {

    constructor(private svgService: SVGService,
        private paletteService: PaletteService) {

    }
    onPressed(event: MouseEvent): null {
        let x: number = event.clientX;
        let y: number = event.clientY;
        let obj: SVGInterface | null = this.svgService.findAt(x, y);
        if (obj != null) {
            if (event.button == 0)
                obj.setPrimary(this.paletteService.getPrimary());
            else if (event.button == 2)
                obj.setSecondary(this.paletteService.getSecondary());
        }
        return null;
    }
    onRelease(event: MouseEvent): {
        return;
    }
    onMotion(event: MouseEvent) {
        return;
    }
}
