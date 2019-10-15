import { Injectable, Renderer2 } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGRect } from 'src/services/svg/element/svg.rect';
import { IShapeTool, TraceType } from './i-shape-tool';

@Injectable({
    providedIn: 'root',
})
export class RectangleTool implements IShapeTool {
    width: number;
    traceType: TraceType;
    isShiftDown: boolean;

    element: SVGRect | null;

    protected renderer: Renderer2;

    constructor(rendererProvider: RendererProviderService, private paletteService: PaletteService) {
        this.renderer = rendererProvider.renderer;
        this.width = 5;
        this.traceType = TraceType.FillAndBorder;
    }

    onPressed(event: MouseEvent): SVGRect | null {
        if (this.element) {
            return null;
        }
        this.element = new SVGRect(event.svgX, event.svgY, this.traceType, this.renderer);

        this.element.setPrimary(this.paletteService.getPrimary());
        this.element.setSecondary(this.paletteService.getSecondary());
        this.element.setPointSize(this.width);
        return this.element;
    }
    onReleased(event: MouseEvent): void {
        if (this.element !== null) {
            this.element.release();
        }
        this.element = null;
    }
    onMotion(event: MouseEvent): void {
        if (this.element) {
            this.element.setCursor(event.svgX, event.svgY, event.shiftKey);
        }
    }

    onKeydown(event: KeyboardEvent): boolean {
        if (event.shiftKey) {
            this.isShiftDown = true;
            return this.onShift();
        }
        return false;
    }

    onKeyup(event: KeyboardEvent): boolean {
        if (!event.shiftKey && this.isShiftDown) {
            this.isShiftDown = false;
            return this.onShift();
        }
        return false;
    }

    private onShift(): boolean {
        if (this.element !== null) {
            this.element.onShift(this.isShiftDown);
            return true;
        }
        return false;
    }
}
