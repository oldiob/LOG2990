import { Injectable } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { Point, Rect } from 'src/utils/geo-primitives';
import { ITool } from './i-tool';

enum State {
    idle = 0,
    maybe,
    selecting,
}

@Injectable({
    providedIn: 'root',
})
export class SelectorTool implements ITool {

    width = 1;		// TODO - Remove me

    state: State = State.idle;

    anchor: Point = new Point();
    cursor: Point = new Point();

    boxElement: any;
    previewElement: any;
    circleTL: any;
    circleTR: any;
    circleBL: any;
    circleBR: any;
    circleN: any;
    circleO: any;
    circleS: any;
    circleW: any;

    selected: Set<SVGInterface> = new Set<SVGInterface>([]);
    selection: Set<SVGInterface> = new Set<SVGInterface>([]);

    policy = false;

    constructor(private svg: SVGService) {
        this.boxElement = DOMRenderer.createElement('polyline', 'svg');
        DOMRenderer.setAttribute(this.boxElement, 'fill', 'none');
        DOMRenderer.setAttribute(this.boxElement, 'stroke', 'black');
        DOMRenderer.setAttribute(this.boxElement, 'stroke-width', '3');
        DOMRenderer.setAttribute(this.boxElement, 'stroke-dasharray', '4');

        this.previewElement = DOMRenderer.createElement('rect', 'svg');
        DOMRenderer.setAttribute(this.previewElement, 'fill', 'none');
        DOMRenderer.setAttribute(this.previewElement, 'stroke', '#00F0FF');
        DOMRenderer.setAttribute(this.previewElement, 'stroke-width', '2');

        this.circleTL = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.circleTL, 'r', '5');
        DOMRenderer.setAttribute(this.circleTL, 'fill', '#00F0FF');

        this.circleTR = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.circleTR, 'r', '5');
        DOMRenderer.setAttribute(this.circleTR, 'fill', '#00F0FF');

        this.circleBL = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.circleBL, 'r', '5');
        DOMRenderer.setAttribute(this.circleBL, 'fill', '#00F0FF');

        this.circleBR = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.circleBR, 'r', '5');
        DOMRenderer.setAttribute(this.circleBR, 'fill', '#00F0FF');

        this.circleN = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.circleN, 'r', '5');
        DOMRenderer.setAttribute(this.circleN, 'fill', '#00F0FF');

        this.circleO = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.circleO, 'r', '5');
        DOMRenderer.setAttribute(this.circleO, 'fill', '#00F0FF');

        this.circleS = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.circleS, 'r', '5');
        DOMRenderer.setAttribute(this.circleS, 'fill', '#00F0FF');

        this.circleW = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(this.circleW, 'r', '5');
        DOMRenderer.setAttribute(this.circleW, 'fill', '#00F0FF');
    }

    onPressed(event: MouseEvent): null {
        if (event.button === 0) {
            this.policy = false;
        } else if (event.button === 2) {
            this.policy = true;
        } else {
            return null;
        }
        switch (this.state) {
            case State.idle:
                this.state = State.maybe;
                break;
            default:
                console.error('Impossible state', this.state);
                this.state = State.idle;
        }
        return null;
    }

    onMotion(event: MouseEvent): void {
        switch (this.state) {
            case State.maybe:
                this.state = State.selecting;
                this.setAnchor(event.svgX, event.svgY);
            // Fallthrought!
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
            case State.selecting:
                this.commit();
            // Fallthrought !
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
        DOMRenderer.setAttribute(this.previewElement, 'x', x1.toString());
        DOMRenderer.setAttribute(this.previewElement, 'y', y1.toString());
        DOMRenderer.setAttribute(this.previewElement, 'width', (x2 - x1).toString());
        DOMRenderer.setAttribute(this.previewElement, 'height', (y2 - y1).toString());

        DOMRenderer.setAttribute(this.circleTL, 'cx', x1.toString());
        DOMRenderer.setAttribute(this.circleTL, 'cy', y1.toString());

        DOMRenderer.setAttribute(this.circleBR, 'cx', x2.toString());
        DOMRenderer.setAttribute(this.circleBR, 'cy', y2.toString());

        DOMRenderer.setAttribute(this.circleBL, 'cx', x1.toString());
        DOMRenderer.setAttribute(this.circleBL, 'cy', y2.toString());

        DOMRenderer.setAttribute(this.circleTR, 'cx', x2.toString());
        DOMRenderer.setAttribute(this.circleTR, 'cy', y1.toString());

        DOMRenderer.setAttribute(this.circleN, 'cx', ((Math.abs(x2) + Math.abs(x1)) / 2).toString());
        DOMRenderer.setAttribute(this.circleN, 'cy', y1.toString());

        DOMRenderer.setAttribute(this.circleO, 'cx',  x1.toString());
        DOMRenderer.setAttribute(this.circleO, 'cy', ((Math.abs(y2) + Math.abs(y1)) / 2).toString());

        DOMRenderer.setAttribute(this.circleS, 'cx',  ((Math.abs(x2) + Math.abs(x1)) / 2).toString());
        DOMRenderer.setAttribute(this.circleS, 'cy', y2.toString());

        DOMRenderer.setAttribute(this.circleW, 'cx',  x2.toString());
        DOMRenderer.setAttribute(this.circleW, 'cy', ((Math.abs(y2) + Math.abs(y1)) / 2).toString());

        this.svg.addElement(this.previewElement);
        this.svg.addElement(this.circleTR);
        this.svg.addElement(this.circleTL);
        this.svg.addElement(this.circleBR);
        this.svg.addElement(this.circleBL);
        this.svg.addElement(this.circleN);
        this.svg.addElement(this.circleO);
        this.svg.addElement(this.circleS);
        this.svg.addElement(this.circleW);
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
        this.renderPreview(this.selected);
        this.svg.removeElement(this.boxElement);
    }
}
