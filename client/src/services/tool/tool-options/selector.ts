import { Injectable } from '@angular/core';
import { CmdDup } from 'src/services/cmd/cmd.dup';
import { CmdInterface, CmdService } from 'src/services/cmd/cmd.service';
import { SVGAbstract } from 'src/services/svg/element/svg.interface';
import { SVGService } from 'src/services/svg/svg.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { Point, Rect } from 'src/utils/geo-primitives';
import { ITool } from './i-tool';
import { vectorPlus, vectorMultiply } from 'src/utils/math';

declare type callback = () => void;

export enum State {
    idle = 0,
    maybe,
    selecting,
    selected,
}

enum Compass {
    N,
    E,
    S,
    W,
    NW,
    NE,
    SW,
    SE,
    MAX,
}

@Injectable({
    providedIn: 'root',
})
export class SelectorTool implements ITool {

    static BASE_OFFSET = 30;

    dupOffset: number[] = [SelectorTool.BASE_OFFSET, SelectorTool.BASE_OFFSET];

    readonly tip: string;

    state: State = State.idle;

    anchor: Point = new Point();
    cursor: Point = new Point();

    boxElement: any;
    previewElement: any;
    previewRect: any;
    points: any[] = new Array(Compass.MAX);

    selected: Set<SVGAbstract> = new Set<SVGAbstract>([]);
    selection: Set<SVGAbstract> = new Set<SVGAbstract>([]);

    policy = false;

    constructor(public svg: SVGService) {
        this.tip = 'Selector (S)';

        this.boxElement = DOMRenderer.createElement('polyline', 'svg', {
            fill: 'none',
            stroke: 'black',
            'stroke-width': '3',
            'stroke-dasharray': '4',
        });

        this.previewElement = DOMRenderer.createElement('g', 'svg');
        this.previewRect = DOMRenderer.createElement('rect', 'svg', {
            fill: 'none',
            stroke: '#00F0FF',
            'stroke-width': '2',
        });
        DOMRenderer.appendChild(this.previewElement, this.previewRect);

        for (let i = 0; i < Compass.MAX; ++i) {
            const point: any = DOMRenderer.createElement('circle', 'svg', {
                fill: '#00F0FF',
                r: '5',
            });
            DOMRenderer.appendChild(this.previewElement, point);
            this.points[i] = point;
        }

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

    onKeydown(event: KeyboardEvent): boolean {
        const kbd: { [id: string]: callback } = {
            'C-a': () => this.selectAll(),
            'C-d': () => {
                this.dupOffset = this.nextOffset(this.dupOffset);
                CmdService.execute(new CmdDup(Array.from(this.selected), this.dupOffset));
            },
        };
        let keys = '';
        if (event.ctrlKey) {
            keys += 'C-';
        }
        keys += event.key.toLowerCase();
        if (kbd[keys]) {
            const func: callback = kbd[keys];
            func();
            return true;
        }
        return false;
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

    private union(A: Set<SVGAbstract>, B: Set<SVGAbstract>): Set<SVGAbstract> {
        const union: any = [];
        A.forEach((v) => union.push(v));
        B.forEach((v) => union.push(v));
        return new Set<SVGAbstract>(union);
    }

    private diff(A: Set<SVGAbstract>, B: Set<SVGAbstract>): Set<SVGAbstract> {
        const diff: any = [];
        A.forEach((v) => {
            if (!B.has(v)) {
                diff.push(v);
            }
        });
        return new Set<SVGAbstract>(diff);
    }

    private computeSelection(): Set<SVGAbstract> {
        if (!this.policy) {
            return this.selection;
        }
        return this.union(this.diff(this.selection, this.selected), this.diff(this.selected, this.selection));
    }

    private doSelection() {
        const rect = new Rect(
            this.anchor.x,
            this.anchor.y,
            this.cursor.x,
            this.cursor.y);
        this.selection = this.svg.getInRect(rect);
        this.renderPreview(this.computeSelection());
    }

    nextOffset(currentOffset: number[]): number[] {
        const newOffset: number[] = vectorPlus(currentOffset, [SelectorTool.BASE_OFFSET, SelectorTool.BASE_OFFSET]); 
        let finalOffset: number[];

        // 0: correct 
        // +1: outside on the right
        // +2: outside on the bottom
        let outsideState = 0;

        let currentXSteps = newOffset[0] / SelectorTool.BASE_OFFSET;
        let currentYSteps = newOffset[1] / SelectorTool.BASE_OFFSET;

        const baseHorizontalSteps = currentXSteps - currentYSteps;
 
        this.selected.forEach(object => {
            object.translate(newOffset[0], newOffset[1]);
            const state = this.elementState(object);
            if (outsideState !== 0) {
                outsideState = Math.min(outsideState, state);
            } else {
                outsideState = state;
            }
            object.translate(-newOffset[0], -newOffset[1]);
        });
        switch (outsideState) {
            case 1:
                finalOffset = vectorMultiply([-1, -1], SelectorTool.BASE_OFFSET);
                break;
            case 2:
                console.log('baseHorizontalSteps', baseHorizontalSteps);
                finalOffset = vectorMultiply([baseHorizontalSteps + 1, 0], SelectorTool.BASE_OFFSET);
                break;
            default:
                finalOffset = newOffset;
        }

        return finalOffset;
    }

    private elementState(element: SVGAbstract): number {
        const entryPositions = this.svg.entry.nativeElement.getBoundingClientRect();
        const rect: any = element.element.getBoundingClientRect();

        rect.x -= entryPositions.left;
        rect.y -= entryPositions.top;

        const right = rect.right - entryPositions.left;
        const bottom = rect.bottom - entryPositions.top;

        let currentState = 0;
        if (right > entryPositions.right) {
            currentState = 1;
        }
        else if (bottom > entryPositions.bottom) {
            currentState = 2;
        }

        return currentState;
    }

    private renderPreview(toRender: Set<SVGAbstract>) {
        let x1 = Infinity;
        let y1 = Infinity;
        let x2 = -Infinity;
        let y2 = -Infinity;
        const entryPositions = this.svg.entry.nativeElement.getBoundingClientRect();
        toRender.forEach((obj) => {
            const rect: any = obj.element.getBoundingClientRect();

            rect.x -= entryPositions.left;
            rect.y -= entryPositions.top;

            x1 = Math.min(x1, rect.x);
            y1 = Math.min(y1, rect.y);
            x2 = Math.max(x2, rect.x + rect.width);
            y2 = Math.max(y2, rect.y + rect.height);
        });
        this.svg.removeElement(this.previewElement);

        DOMRenderer.setAttributes(this.previewRect, {
            x: x1.toString(),
            y: y1.toString(),
            width: (x2 - x1).toString(),
            height: (y2 - y1).toString(),
        });

        DOMRenderer.setAttributes(this.points[Compass.NW], {
            cx: x1.toString(),
            cy: y1.toString(),
        });

        DOMRenderer.setAttributes(this.points[Compass.SE], {
            cx: x2.toString(),
            cy: y2.toString(),
        });

        DOMRenderer.setAttributes(this.points[Compass.SW], {
            cx: x1.toString(),
            cy: y2.toString(),
        });

        DOMRenderer.setAttributes(this.points[Compass.NE], {
            cx: x2.toString(),
            cy: y1.toString(),
        });

        DOMRenderer.setAttributes(this.points[Compass.N], {
            cx: ((Math.abs(x2) + Math.abs(x1)) / 2).toString(),
            cy: y1.toString(),
        });

        DOMRenderer.setAttributes(this.points[Compass.E], {
            cx: x1.toString(),
            cy: ((Math.abs(y2) + Math.abs(y1)) / 2).toString(),
        });

        DOMRenderer.setAttributes(this.points[Compass.S], {
            cx: ((Math.abs(x2) + Math.abs(x1)) / 2).toString(),
            cy: y2.toString(),
        });

        DOMRenderer.setAttributes(this.points[Compass.W], {
            cx: x2.toString(),
            cy: y2.toString(),
        });

        this.svg.addElement(this.previewElement);
    }

    private selectAt(x: number, y: number) {
        const target: SVGAbstract | null = this.svg.findAt(x, y);
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
        } else {
            this.state = State.idle;
        }
        this.renderPreview(this.selected);
        this.svg.removeElement(this.boxElement);
    }

    selectAll() {
        this.selected = new Set<SVGAbstract>(this.svg.objects);
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
        this.dupOffset = [SelectorTool.BASE_OFFSET, SelectorTool.BASE_OFFSET];
    }
}
