import { ITool } from './i-tool';
import { Injectable } from '@angular/core';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';
import { SVGService } from 'src/services/svg/svg.service';
import { PaletteService } from 'src/services/palette/palette.service';

@Injectable({
    providedIn: 'root',
})
export class DropperTool implements ITool {
    element: null;

    width: number;

    canvasContext: CanvasRenderingContext2D;

    constructor(
        private svgService: SVGService,
        private paletteService: PaletteService) {
    }

    onPressed(event: MouseEvent): null {
        const canvas = RendererProvider.renderer.createElement('canvas');
        RendererProvider.renderer.setAttribute(canvas, 'width', this.svgService.entry.nativeElement.attributes.width.nodeValue);
        RendererProvider.renderer.setAttribute(canvas, 'height', this.svgService.entry.nativeElement.attributes.height.nodeValue);

        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

        const svgOuterHTML = this.svgService.entry.nativeElement.outerHTML;

        const svgImage: HTMLImageElement = new Image();
        svgImage.src = 'data:image/svg+xml,' + svgOuterHTML;
        RendererProvider.renderer.appendChild(canvas, svgImage);

        const setColor = (): void => {
            ctx.drawImage(svgImage, 0, 0);
            const color = ctx.getImageData(event.svgX, event.svgY, 1, 1).data;

            if (event.button === 0) {
                this.paletteService.selectPrimary(color[0], color[1], color[2], color[3]);
            } else if (event.button === 2) {
                this.paletteService.selectSecondary(color[0], color[1], color[2], color[3]);
            }
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
