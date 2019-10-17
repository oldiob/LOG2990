import { ITool } from './i-tool';
import { Injectable, Renderer2 } from '@angular/core';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGService } from 'src/services/svg/svg.service';
import { PaletteService } from 'src/services/palette/palette.service';

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
        private svgService: SVGService,
            /*private paletteService: PaletteService*/) {
        this.renderer = rendererProvider.renderer;
    }

    onPressed(event: MouseEvent): null {
        const canvas = this.renderer.createElement('canvas');

        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

        const svgOuterHTML = this.svgService.entry.nativeElement.outerHTML;

        const svgImage: HTMLImageElement = new Image();
        svgImage.src = 'data:image/svg+xml;base64,' + window.btoa(svgOuterHTML);

        const setColor = (): void => {
            ctx.drawImage(svgImage, 0, 0);
            console.log(svgImage.width, svgImage.height);
            console.log(ctx.getImageData(event.svgX, event.svgY, 1, 1).data);
        };

        svgImage.onload = setColor;

        return null;
    }

    onMotion(event: MouseEvent): void {
        //
    }
    onReleased(event: MouseEvent): void {
        return;
    }
}
