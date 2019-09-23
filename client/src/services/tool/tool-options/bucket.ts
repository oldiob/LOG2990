import { ITool } from './i-tool';

export class Bucket implements ITool {
    FILENAME: string = "bucket.png";

    //TODO: TEMPORARY
    constructor(/*private svgService: SVGService,
        private paletteService: PaletteService*/) {
    }

    onReleased(event: MouseEvent): void {
        //
    }

    onPressed(event: MouseEvent): null {
        //TODO: TEMPORARY
        /*const x: number = event.clientX;
        const y: number = event.clientY;
       
        const obj: SVGInterface | null = this.svgService.findAt(x, y);
        if (obj != null) {
            if (event.button === 0) {
                obj.setPrimary(+this.paletteService.getPrimary());
            } else if (event.button === 2) {
                obj.setSecondary(+this.paletteService.getSecondary());
            }
        }*/
        return null;
    }
    onRelease(event: MouseEvent) {
        return;
    }
    onMotion(event: MouseEvent) {
        return;
    }
}
