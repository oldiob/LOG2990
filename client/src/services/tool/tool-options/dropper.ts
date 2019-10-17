import { ITool } from './i-tool';
import { Injectable, Renderer2 } from '@angular/core';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';

@Injectable({
    providedIn: 'root',
})
export class DropperTool implements ITool {
    readonly BUTTON_FILENAME = 'dropper.png';
    readonly CURSOR_FILENAME = 'dropper.png';

    element: null;

    width: number;

    renderer: Renderer2;
    canvasContext: CanvasRenderingContext2D;

    constructor(
            rendererProvider: RendererProviderService,
            //private svgService: SVGService,
            /*private paletteService: PaletteService*/) {
        this.renderer = rendererProvider.renderer;
    }

    onPressed(event: MouseEvent): null {
        const canvas = document.createElement('canvas');

        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

        //const svg = this.svgService.entry.nativeElement;
        //const svgInner: string = svg.outerHTML;

        var svgImage: HTMLImageElement = new Image(100, 100);
        svgImage.src = 'data:image/svg+xml;base64,' + window.btoa('<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#aaaaaa"/></svg>');

        function drawBitmap() {
            console.log('drawing bitmap');

            if (ctx){
                ctx.drawImage(svgImage, 0, 0);
                console.log(ctx.getImageData(0, 0, 10, 10).data);
            }
        }

        console.log('waiting to draw');
        svgImage.onload = drawBitmap;

        return null;
    }

    onMotion(event: MouseEvent): void {
        //
    }
    onReleased(event: MouseEvent): void {
        return;
    }
}
