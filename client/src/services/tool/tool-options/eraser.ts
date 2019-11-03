import { Injectable } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
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

    activated: boolean;
    width: number;

    container: any | null;
    objectsOnHold: (SVGInterface | null)[] = [];

    cmd: CmdEraser;

    constructor(private svgService: SVGService) {
        this.activated = false;
        this.width = 64;
        this.tip = 'Eraser (E)';

        this.container = DOMRenderer.createElement('g', 'svg');
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
        this.objectsOnHold.forEach((obj) => {
            this.cmd.eraseObject(obj);
        });
    }
}
