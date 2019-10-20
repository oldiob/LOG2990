import { ITool } from './i-tool';
import { Injectable } from '@angular/core';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';
import { SVGService } from 'src/services/svg/svg.service';
import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';

@Injectable({
    providedIn: 'root',
})
export class DropperTool implements ITool {
    element: null;

    width: number;

    imageData: ImageData;

    currentColor: Color;

    constructor(
        private svgService: SVGService,
        private paletteService: PaletteService) {
        this.currentColor = new Color(0, 0, 0, 0);
    }

    loadImage() {
        const canvas = RendererProvider.renderer.createElement('canvas');

        RendererProvider.renderer.setAttribute(canvas, 'width',
            this.svgService.entry.nativeElement.attributes.width.nodeValue);
        RendererProvider.renderer.setAttribute(canvas, 'height',
            this.svgService.entry.nativeElement.attributes.height.nodeValue);

        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

        const svgOuterHTML = this.svgService.entry.nativeElement.outerHTML;

        const svgImage: HTMLImageElement = new Image();
        svgImage.src = 'data:image/svg+xml,' + svgOuterHTML;
        RendererProvider.renderer.appendChild(canvas, svgImage);

        const setColor = (): void => {
            ctx.drawImage(svgImage, 0, 0);
            this.imageData = ctx.getImageData(0, 0, svgImage.width, svgImage.height);
        };

        svgImage.onload = setColor;
    }

    onPressed(event: MouseEvent): null {
        if (event.button === 0) {
            this.paletteService.selectPrimary(
                this.currentColor.red,
                this.currentColor.blue,
                this.currentColor.green,
                this.currentColor.alpha);
        } else if (event.button === 2) {
            this.paletteService.selectSecondary(
                this.currentColor.red,
                this.currentColor.blue,
                this.currentColor.green,
                this.currentColor.alpha);
        }

        return null;
    }

    onMotion(event: MouseEvent): void {
        const pixelData = this.getPixelData(this.imageData, event.svgX, event.svgY);

        this.currentColor.red = pixelData[0];
        this.currentColor.green = pixelData[1];
        this.currentColor.blue = pixelData[2];
        this.currentColor.alpha = pixelData[3];
    }
    onReleased(event: MouseEvent): void {
        return;
    }

    private getPixelData(imageData: ImageData, x: number, y: number) {
        const pixelIndex: number = Math.round((y * imageData.width + x) * 4);
        return [
            imageData.data[pixelIndex + 0],
            imageData.data[pixelIndex + 1],
            imageData.data[pixelIndex + 2],
            imageData.data[pixelIndex + 3]];
    }
}
