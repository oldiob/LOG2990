import { Injectable } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';

import { ITool } from './i-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { recreateElement } from 'src/utils/element-parser';

@Injectable({
    providedIn: 'root',
})
export class EraserTool implements ITool {

    activated: boolean;
    width: number;

    container: any | null;
    objectsOnHold: (SVGInterface | null)[] = [];

    constructor(private svgService: SVGService) {
        this.activated = false;
        this.width = 64;

        this.container = DOMRenderer.createElement('g', 'svg');
    }

    onPressed(event: MouseEvent): null {
        this.activated = true;
        this.deleteAll();
        this.flushContainer();

        return null;
    }

    onReleased(event: MouseEvent): void {
        this.activated = false;
    }

    onMotion(event: MouseEvent): void {
        const x: number = event.svgX;
        const y: number = event.svgY;

        this.flushContainer();
        this.objectsOnHold = this.svgService.findIn(x, y, this.width);

        if (this.activated) {
            this.deleteAll();
        } else {
            for (const obj of this.objectsOnHold) {
                if (obj !== null && obj.element) {
                    DOMRenderer.appendChild(this.container, this.createFake(obj.element));
                }
            }
        }
    }

    private createFake(fakeElement: any): any {
        const filter = DOMRenderer.createElement('g', 'svg');
        DOMRenderer.setAttribute(filter, 'filter', 'url(#erase)');
        DOMRenderer.appendChild(filter, recreateElement(fakeElement));

        return filter;
    }

    private flushContainer() {
        DOMRenderer.removeChild(this.svgService.entry.nativeElement, this.container);
        for (const child of this.container.children) {
            DOMRenderer.removeChild(this.container, child);
        }
        DOMRenderer.appendChild(this.svgService.entry.nativeElement, this.container);
    }

    private deleteAll() {
        this.objectsOnHold.forEach(obj => {
            this.svgService.removeObject(obj);
        });
    }
}
