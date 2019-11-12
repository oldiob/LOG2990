import { Injectable } from '@angular/core';
import { SVGAbstract } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';

import { CmdEraser } from 'src/services/cmd/cmd.eraser';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { recreateElement } from 'src/utils/element-parser';
import { ITool } from './i-tool';

@Injectable({
    providedIn: 'root',
})
export class EraserTool implements ITool {

    readonly tip: string;

    private activated: boolean;
    private mWidth: number;

    private container: any | null;
    private objectsOnHold: (SVGAbstract | null)[] = [];

    private cmd: CmdEraser;

    private surroundingRectangle: any | null;

    constructor(private svgService: SVGService) {
        this.surroundingRectangle = null;

        this.activated = false;
        this.width = 64;
        this.tip = 'Eraser (E)';

        this.container = DOMRenderer.createElement('g', 'svg');
    }

    set width(width: number) {
        if (this.surroundingRectangle !== null) {
            DOMRenderer.setAttribute(this.surroundingRectangle, 'width', width.toString());
            DOMRenderer.setAttribute(this.surroundingRectangle, 'height', width.toString());
        }

        this.mWidth = width;
    }

    get width(): number {
        return this.mWidth;
    }

    onPressed(event: MouseEvent): CmdEraser {
        this.cmd = new CmdEraser();

        this.activated = true;
        this.deleteAll();
        this.flushContainer();

        return this.cmd;
    }

    onReleased(event: MouseEvent): void {
        this.activated = false;
    }

    onMotion(event: MouseEvent): void {
        const x: number = event.svgX;
        const y: number = event.svgY;

        if (this.surroundingRectangle === null) {
            this.createSurroundingRectangle(x, y);
        }
        this.moveSurroundingRectangle(x, y);

        this.flushContainer();
        this.objectsOnHold = this.svgService.inRectangle(x, y, this.width, this.width);

        if (this.activated) {
            this.deleteAll();
        } else {
            for (const obj of this.objectsOnHold) {
                if (obj !== null && obj.element) {
                    DOMRenderer.appendChild(this.container, this.createFakeElement(obj.element));
                }
            }
        }
    }

    private createFakeElement(fakeElement: any): any {
        const filter = DOMRenderer.createElement('g', 'svg');
        DOMRenderer.setAttribute(filter, 'filter', 'url(#erase)');
        DOMRenderer.appendChild(filter, recreateElement(fakeElement));

        return filter;
    }

    private flushContainer(): void {
        DOMRenderer.removeChild(this.svgService.entry.nativeElement, this.container);
        for (const child of this.container.children) {
            DOMRenderer.removeChild(this.container, child);
        }
        DOMRenderer.appendChild(this.svgService.entry.nativeElement, this.container);
    }

    private deleteAll(): void {
        this.objectsOnHold.forEach((obj) => {
            this.cmd.eraseObject(obj);
        });
    }

    onLeave(): void {
        if (this.surroundingRectangle !== null) {
            DOMRenderer.removeChild(this.svgService.entry.nativeElement, this.surroundingRectangle);
            this.surroundingRectangle = null;
        }
    }

    private createSurroundingRectangle(x: number, y: number): void {
        this.onLeave();

        this.surroundingRectangle = DOMRenderer.createElement('rect', 'svg');
        this.moveSurroundingRectangle(x, y);
        this.width = this.mWidth;

        DOMRenderer.setAttribute(this.surroundingRectangle, 'fill', 'white');
        DOMRenderer.setAttribute(this.surroundingRectangle, 'stroke-width', '1');
        DOMRenderer.setAttribute(this.surroundingRectangle, 'stroke', 'black');

        DOMRenderer.appendChild(this.svgService.entry.nativeElement, this.surroundingRectangle);
    }

    private moveSurroundingRectangle(x: number, y: number): void {
        const halfWidth = this.width / 2.0;
        DOMRenderer.setAttribute(this.surroundingRectangle, 'x', (x - halfWidth).toString());
        DOMRenderer.setAttribute(this.surroundingRectangle, 'y', (y - halfWidth).toString());
    }
}
