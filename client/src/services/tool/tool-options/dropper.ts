import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGService } from 'src/services/svg/svg.service';
import { Color } from 'src/utils/color';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class DropperTool implements ITool {
    element: null;

    imageData: ImageData;

    loaded: boolean;

    currentColor: Color;

    constructor(
        private svgService: SVGService,
        private paletteService: PaletteService) {
        this.currentColor = new Color(0, 0, 0, 0);
        this.loaded = false;
    }

    loadImage() {
        this.loaded = false;

        const canvas = DOMRenderer.createElement('canvas');

        DOMRenderer.setAttribute(canvas, 'width',
            this.svgService.entry.nativeElement.attributes.width.nodeValue);
        DOMRenderer.setAttribute(canvas, 'height',
            this.svgService.entry.nativeElement.attributes.height.nodeValue);

        const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

        const svgOuterHTML = this.svgService.entry.nativeElement.outerHTML;

        const svgImage: HTMLImageElement = new Image();
        svgImage.src = 'data:image/svg+xml;base64,' + window.btoa(svgOuterHTML);
        DOMRenderer.appendChild(canvas, svgImage);

        const setColor = (): void => {
            ctx.drawImage(svgImage, 0, 0);
            this.imageData = ctx.getImageData(0, 0, svgImage.width, svgImage.height);

            this.loaded = true;
        };

        svgImage.onload = setColor;
    }

    onPressed(event: MouseEvent): null {
        if (!this.loaded) {
            return null;
        }

        if (event.button === 0) {
            this.paletteService.selectPrimary(
                this.currentColor.red,
                this.currentColor.green,
                this.currentColor.blue,
                this.currentColor.alpha);
        } else if (event.button === 2) {
            this.paletteService.selectSecondary(
                this.currentColor.red,
                this.currentColor.green,
                this.currentColor.blue,
                this.currentColor.alpha);
        }

        return null;
    }

    onMotion(event: MouseEvent): void {
        if (!this.loaded) {
            return;
        }

        const pixelData = this.getPixelData(this.imageData, event.svgX, event.svgY);

        this.currentColor.red = pixelData[0];
        this.currentColor.green = pixelData[1];
        this.currentColor.blue = pixelData[2];
        this.currentColor.alpha = pixelData[3];
    }
    onReleased(event: MouseEvent): void {
        return;
    }

    getPixelData(imageData: ImageData, x: number, y: number) {
        const pixelIndex: number = Math.round((y * imageData.width + x) * 4);
        return [
            imageData.data[pixelIndex + 0],
            imageData.data[pixelIndex + 1],
            imageData.data[pixelIndex + 2],
            imageData.data[pixelIndex + 3]];
    }
}
