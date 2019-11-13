import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGService } from 'src/services/svg/svg.service';
import { Color } from 'src/utils/color';
import { svgToImage } from 'src/utils/element-parser';
import { ITool } from './i-tool';
import { MyInjector } from 'src/utils/injector';

@Injectable({
    providedIn: 'root',
})
export class DropperTool implements ITool {
    element: null;

    readonly tip: string;

    private imageData: ImageData;

    private isLoaded: boolean;

    private currentColor: Color;

    constructor(
        private paletteService: PaletteService) {
        this.currentColor = new Color(0, 0, 0, 0);
        this.isLoaded = false;
        this.tip = 'Pipette (I)';
    }

    onSelect() {
        this.isLoaded = false;

        const createImageData = (svgImage: HTMLImageElement, ctx: CanvasRenderingContext2D): void => {
            ctx.drawImage(svgImage, 0, 0);
            this.imageData = ctx.getImageData(0, 0, svgImage.width, svgImage.height);

            this.isLoaded = true;
        };

        svgToImage(MyInjector.get(SVGService).entry, createImageData);
    }

    onPressed(event: MouseEvent): null {
        if (!this.isLoaded) {
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
        if (!this.isLoaded) {
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

    onShowcase(): null {
        return null;
    }
}
