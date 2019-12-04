import { Injectable } from '@angular/core';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { SVGService } from 'src/services/svg/svg.service';

import { CmdComposite } from 'src/services/cmd/cmd.array';
import { CmdErase } from 'src/services/cmd/cmd.eraser';
import { CmdService } from 'src/services/cmd/cmd.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { recreateElement } from 'src/utils/element-parser';
import { Rect } from 'src/utils/geo-primitives';
import { ITool } from './i-tool';
import { MyInjector } from 'src/utils/injector';
import { WorkZoneComponent } from 'src/app/work-zone/work-zone.component';
import { WorkZoneService } from 'src/services/work-zone/work-zone.service';

@Injectable({
    providedIn: 'root',
})
export class EraserTool implements ITool {

    readonly tip: string = 'Eraser (E)';

    private mIsActivated: boolean;
    private mWidth: number;

    private cmd: CmdComposite;
    private eraserRect: SVGRectElement;
    private surroundingRect: SVGGElement;

    constructor(private svgService: SVGService) {
        this.eraserRect = DOMRenderer.createElement('rect', 'svg', {
            'stroke-width': '1',
            stroke: 'black',
        });
        this.surroundingRect = DOMRenderer.createElement('g', 'svg', {
            'stroke-width': '1',
            filter: 'url(#erase)',
        });

        this.isActivated = false;
        this.width = 10;
    }

    set isActivated(isActivated: boolean) {
        this.mIsActivated = isActivated;
        DOMRenderer.setAttribute(this.eraserRect, 'fill', isActivated ? 'red' : 'white');
    }

    get isActivated(): boolean {
        return this.mIsActivated;
    }

    set width(width: number) {
        this.mWidth = width;
        DOMRenderer.setAttributes(this.eraserRect, { width: width.toString(), height: width.toString() });
    }

    get width(): number {
        return this.mWidth;
    }

    onPressed(event: MouseEvent): null {
        this.cmd = new CmdComposite();

        this.isActivated = true;
        this.onMotion(event);

        return null;
    }

    onReleased(event: MouseEvent): void {
        this.isActivated = false;

        if (this.cmd.commands.length !== 0) {
            CmdService.undos.push(this.cmd);
        }
    }

    onMotion(event: MouseEvent): void {
        const x: number = event.svgX;
        const y: number = event.svgY;

        this.moveSurroundingRectangle(x, y);
        this.hideSurroundingRect();

        const rect: DOMRect = this.svgService.getElementRect(this.eraserRect);

        const object: SVGAbstract | null = this.svgService.inRectangle(new Rect(rect.x, rect.y, rect.right, rect.bottom));

        if (object !== null) {
            if (this.isActivated) {
                const erase: CmdErase = new CmdErase(object);
                erase.execute();
                this.cmd.addChild(erase);
            } else {
                this.showSurroundingRect(object);
            }
        }

        this.showEraser();
    }

    onLeave(): void {
        this.hideEraser();
        this.hideSurroundingRect();
    }

    onSelect(): void {
        this.showEraser();

        MyInjector.get(WorkZoneService).cursor = 'none';
    }

    onUnSelect(): void {
        this.onLeave();
        MyInjector.get(WorkZoneService).resetCursor();
    }

    private moveSurroundingRectangle(x: number, y: number): void {
        const halfWidth = this.width / 2.0;
        DOMRenderer.setAttribute(this.eraserRect, 'x', (x - halfWidth).toString());
        DOMRenderer.setAttribute(this.eraserRect, 'y', (y - halfWidth).toString());
    }

    private hideEraser(): void {
        DOMRenderer.removeChild(this.svgService.entry.nativeElement, this.eraserRect);
    }

    private showEraser(): void {
        this.hideEraser();
        DOMRenderer.appendChild(this.svgService.entry.nativeElement, this.eraserRect);
    }

    private hideSurroundingRect(): void {
        this.svgService.removeElement(this.surroundingRect);

        const children: HTMLCollection = this.surroundingRect.children;
        for (let i = 0; i < children.length; i++) {
            DOMRenderer.removeChild(this.surroundingRect, children.item(i));
        }
    }

    private showSurroundingRect(element: SVGAbstract): void {
        this.hideSurroundingRect();

        const fakeElement = recreateElement(element.element);
        DOMRenderer.appendChild(this.surroundingRect, fakeElement);

        this.svgService.addElement(this.surroundingRect);
    }

    onShowcase(): null {
        return null;
    }
}
