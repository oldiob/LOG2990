import { Injectable } from '@angular/core';
import { PaletteService } from 'src/services/palette/palette.service';
import { RendererProviderService } from 'src/services/renderer-provider/renderer-provider.service';
import { SVGLine } from 'src/services/svg/element/svg.line';

import { ITool } from './i-tool';

declare type callback = () => void;

@Injectable({
    providedIn: 'root',
})
export class LineTool implements ITool {
    element: SVGLine | null = null;
    width = 1;
    angle: number;

    constructor(private paletteService: PaletteService, private rendererProvider: RendererProviderService) { }

    onPressed(event: MouseEvent): SVGLine | null {
        if (this.element) {
            this.element.addAnchor(event.svgX, event.svgY);
            return null;
        }
        const line = new SVGLine(event.svgX, event.svgY, this.rendererProvider.renderer);
        line.setWidth(this.width);
        line.setPrimary(this.paletteService.getPrimary());
        this.element = line;
        return line;
    }

    onReleased(event: MouseEvent): void {
        if (!this.element) {
            return;
        }
        if (event.doubleClick) {
            this.element.anchors.pop();
            this.element.anchors.pop();
            if (event.shiftKey) {
                this.element.lineLoop();
            }
            else {
                this.element.finish();
            }
            this.element = null;
            return;
        }
    }

    onMotion(event: MouseEvent): void {
        if (this.element) {
            this.element.setCursor(event.svgX, event.svgY);
        }
    }

    onKeyup(event: KeyboardEvent): boolean {
        const actions: { [id: string]: callback } = {
            'Escape': () => { if (this.element) { this.element.end(); this.element = null; } },
            'Backspace': () => { if (this.element) { this.element.popAnchor(); } },
        };
        if (event.key in actions) {
            const func: callback = actions[event.key];
            func();
            return true;
        }
        return false;
    }

}
