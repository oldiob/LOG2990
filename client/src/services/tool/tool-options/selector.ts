import { Injectable } from '@angular/core';
import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { Point, Rect } from 'src/utils/geo-primitives';
import { ITool } from './i-tool';

export enum State {
    idle = 0,
    maybe,
    selecting,
    selected,
}

@Injectable({
    providedIn: 'root',
})
export class SelectorTool implements ITool {

    readonly tip: string;

    state: State = State.idle;

    anchor: Point = new Point();
    cursor: Point = new Point();

    boxElement: any;
    previewElement: any;
    previewRect: any;
    NW: any;
    NE: any;
    SW: any;
    SE: any;
    N: any;
    E: any;
    S: any;
    W: any;

    selected: Set<SVGInterface> = new Set<SVGInterface>([]);
    selection: Set<SVGInterface> = new Set<SVGInterface>([]);

    policy = false;

    constructor(public svg: SVGService) {
        this.tip = 'Selector (S)';

        this.boxElement = DOMRenderer.createElement('polyline', 'svg');
        DOMRenderer.setAttribute(this.boxElement, 'fill', 'none');
        DOMRenderer.setAttribute(this.boxElement, 'stroke', 'black');
        DOMRenderer.setAttribute(this.boxElement, 'stroke-width', '3');
        DOMRenderer.setAttribute(this.boxElement, 'stroke-dasharray', '4');

        this.previewElement = DOMRenderer.createElement('g', 'svg');

        this.previewRect = DOMRenderer.createElement('rect', 'svg');
        DOMRenderer.setAttribute(this.previewRect, 'fill', 'none');
        DOMRenderer.setAttribute(this.previewRect, 'stroke', '#00F0FF');
        DOMRenderer.setAttribute(this.previewRect, 'stroke-width', '2');

        this.NW = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.NW, 'r', '5');
        DOMRenderer.setAttribute(this.NW, 'fill', '#00F0FF');

        this.NE = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.NE, 'r', '5');
        DOMRenderer.setAttribute(this.NE, 'fill', '#00F0FF');

        this.SW = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.SW, 'r', '5');
        DOMRenderer.setAttribute(this.SW, 'fill', '#00F0FF');

        this.SE = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.SE, 'r', '5');
        DOMRenderer.setAttribute(this.SE, 'fill', '#00F0FF');

        this.N = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.N, 'r', '5');
        DOMRenderer.setAttribute(this.N, 'fill', '#00F0FF');

        this.E = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.E, 'r', '5');
        DOMRenderer.setAttribute(this.E, 'fill', '#00F0FF');

        this.S = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.S, 'r', '5');
        DOMRenderer.setAttribute(this.S, 'fill', '#00F0FF');

        this.W = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.W, 'r', '5');
        DOMRenderer.setAttribute(this.W, 'fill', '#00F0FF');

        DOMRenderer.appendChild(this.previewElement, this.previewRect);
        DOMRenderer.appendChild(this.previewElement, this.NE);
        DOMRenderer.appendChild(this.previewElement, this.NW);
        DOMRenderer.appendChild(this.previewElement, this.SE);
        DOMRenderer.appendChild(this.previewElement, this.SW);
        DOMRenderer.appendChild(this.previewElement, this.N);
        DOMRenderer.appendChild(this.previewElement, this.E);
        DOMRenderer.appendChild(this.previewElement, this.S);
        DOMRenderer.appendChild(this.previewElement, this.W);
    }

    onPressed(event: MouseEvent): CmdInterface | null {
        const cmd: CmdInterface | null = null;
        switch (event.button) {
            case 0:
                this.policy = false;
                break;

            case 2:
                this.policy = true;
                break;

            default:
                return null;
        }
        switch (this.state) {
            case State.idle:
                this.state = State.maybe;
                break;
            case State.selected:
                this.state = State.maybe;
                break;
            default:
                this.state = State.idle;
        }
        return cmd;
    }

    onMotion(event: MouseEvent): void {
        switch (this.state) {
            case State.maybe:
                this.state = State.selecting;
                this.setAnchor(event.svgX, event.svgY);
            // Fallthrought!
            // tslint:disable-next-line: no-switch-case-fall-through
            case State.selecting:
                this.setCursor(event.svgX, event.svgY);
                break;
            default:
            // NO OP
        }
    }

    onReleased(event: MouseEvent): void {
        switch (this.state) {
            case State.maybe:
                this.selectAt(event.svgX, event.svgY);
            // Fallthrought !
            // tslint:disable-next-line: no-switch-case-fall-through
            case State.selecting:
                this.commit();
                break;
            default:
                this.state = State.idle;
        }
    }

    private setAnchor(x: number, y: number) {
        this.anchor.x = x;
        this.anchor.y = y;
        DOMRenderer.setAttribute(this.boxElement, 'stroke-dasharray', '4');
        this.svg.addElement(this.boxElement);
    }

    private setCursor(x: number, y: number) {
        this.cursor.x = x;
        this.cursor.y = y;
        const points: number[][] = [
            [this.anchor.x, this.anchor.y],
            [this.cursor.x, this.anchor.y],
            [this.cursor.x, this.cursor.y],
            [this.anchor.x, this.cursor.y],
            [this.anchor.x, this.anchor.y],
        ];
        DOMRenderer.setAttribute(this.boxElement, 'points', points.map((e) => {
            return e.join(',');
        }).join(' '));
        this.doSelection();
    }

    private union(A: Set<SVGInterface>, B: Set<SVGInterface>): Set<SVGInterface> {
        const union: any = [];
        A.forEach((v) => union.push(v));
        B.forEach((v) => union.push(v));
        return new Set<SVGInterface>(union);
    }

    private diff(A: Set<SVGInterface>, B: Set<SVGInterface>): Set<SVGInterface> {
        const diff: any = [];
        A.forEach((v) => {
            if (!B.has(v)) {
                diff.push(v);
            }
        });
        return new Set<SVGInterface>(diff);
    }

    private computeSelection(): Set<SVGInterface> {
        if (!this.policy) {
            return this.selection;
        }
        return this.union(this.diff(this.selection, this.selected), this.diff(this.selected, this.selection));
    }

    private doSelection() {
        const rect = new Rect(this.anchor.x, this.anchor.y, this.cursor.x, this.cursor.y);
        this.selection = this.svg.getInRect(rect);
        this.renderPreview(this.computeSelection());
    }

    private renderPreview(toRender: Set<SVGInterface>) {
        let x1 = Infinity;
        let y1 = Infinity;
        let x2 = -Infinity;
        let y2 = -Infinity;
        toRender.forEach((obj) => {
            const rect: any = obj.element.getBBox();
            x1 = Math.min(x1, rect.x);
            y1 = Math.min(y1, rect.y);
            x2 = Math.max(x2, rect.x + rect.width);
            y2 = Math.max(y2, rect.y + rect.height);
        });
        this.svg.removeElement(this.previewElement);
        DOMRenderer.setAttribute(this.previewRect, 'x', x1.toString());
        DOMRenderer.setAttribute(this.previewRect, 'y', y1.toString());
        DOMRenderer.setAttribute(this.previewRect, 'width', (x2 - x1).toString());
        DOMRenderer.setAttribute(this.previewRect, 'height', (y2 - y1).toString());

        DOMRenderer.setAttribute(this.NW, 'cx', x1.toString());
        DOMRenderer.setAttribute(this.NW, 'cy', y1.toString());

        DOMRenderer.setAttribute(this.SE, 'cx', x2.toString());
        DOMRenderer.setAttribute(this.SE, 'cy', y2.toString());

        DOMRenderer.setAttribute(this.SW, 'cx', x1.toString());
        DOMRenderer.setAttribute(this.SW, 'cy', y2.toString());

        DOMRenderer.setAttribute(this.NE, 'cx', x2.toString());
        DOMRenderer.setAttribute(this.NE, 'cy', y1.toString());

        DOMRenderer.setAttribute(this.N, 'cx', ((Math.abs(x2) + Math.abs(x1)) / 2).toString());
        DOMRenderer.setAttribute(this.N, 'cy', y1.toString());

        DOMRenderer.setAttribute(this.E, 'cx', x1.toString());
        DOMRenderer.setAttribute(this.E, 'cy', ((Math.abs(y2) + Math.abs(y1)) / 2).toString());

        DOMRenderer.setAttribute(this.S, 'cx', ((Math.abs(x2) + Math.abs(x1)) / 2).toString());
        DOMRenderer.setAttribute(this.S, 'cy', y2.toString());

        DOMRenderer.setAttribute(this.W, 'cx', x2.toString());
        DOMRenderer.setAttribute(this.W, 'cy', ((Math.abs(y2) + Math.abs(y1)) / 2).toString());

        this.svg.addElement(this.previewElement);
    }

    private selectAt(x: number, y: number) {
        const target: SVGInterface | null = this.svg.findAt(x, y);
        if (target) {
            this.selection = new Set([target]);
        } else {
            this.selection.clear();
        }
    }

    private commit() {
        this.selected = this.computeSelection();
        if (this.selected.size) {
            this.state = State.selected;
        }
        else {
            this.state = State.idle;
        }
        this.renderPreview(this.selected);
        this.svg.removeElement(this.boxElement);
    }

    selectAll() {
        this.selected = new Set<SVGInterface>(this.svg.objects);
        this.renderPreview(this.selected);
        this.svg.removeElement(this.boxElement);
        this.state = State.selected;
    }

    reset() {
        this.selected.clear();
        this.selection.clear();
        this.svg.removeElement(this.boxElement);
        this.svg.removeElement(this.previewElement);
        this.state = State.idle;
    }
}
