import { ITool } from './i-tool';
import { Injectable, Renderer2 } from '@angular/core';
import { SVGService } from 'src/services/svg/svg.service';
import { PaletteService } from 'src/services/palette/palette.service';
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
            private svgService: SVGService,
            private paletteService: PaletteService) {
        this.renderer = rendererProvider.renderer;
    }

    onPressed(event: MouseEvent): null {
        const canvas = this.renderer.createElement('canvas');
        this.canvasContext = canvas.getContext('2d');

        this.canvasContext.drawImage(this.svgService.entry.nativeElement, 2, 2);
        return null;
    }

    onMotion(event: MouseEvent): void {
        //
    }
    onReleased(event: MouseEvent): void {
        return;
    }
}
