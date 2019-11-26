import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CmdArray } from 'src/services/cmd/cmd.array';
import { CmdDup } from 'src/services/cmd/cmd.dup';
import { CmdEraser } from 'src/services/cmd/cmd.eraser';
import { CmdMatrix } from 'src/services/cmd/cmd.matrix';
import { CmdInterface, CmdService } from 'src/services/cmd/cmd.service';
import { GridService } from 'src/services/grid/grid.service';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { SVGComposite } from 'src/services/svg/element/svg.composite';
import { SVGService } from 'src/services/svg/svg.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { Point, Rect } from 'src/utils/geo-primitives';
import { MyInjector } from 'src/utils/injector';
import { vectorMultiply, vectorPlus } from 'src/utils/math';
import { Compass } from '../../../utils/compass';
import { ITool } from './i-tool';

declare type callback = () => void;

export enum State {
    idle = 0,
    maybe,
    selecting,
    selected,
    moving,
    rotating,
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

    boxElement: SVGPolylineElement;
    previewElement: SVGGElement;
    previewRect: SVGRectElement;
    points: SVGCircleElement[] = new Array(Compass.MAX);

    selected: Set<SVGAbstract> = new Set<SVGAbstract>([]);
    selection: Set<SVGAbstract> = new Set<SVGAbstract>([]);
    selectedComposite: SVGComposite;

    transforms: CmdArray<CmdMatrix> | null;

    policy = false;

    distanceToCenter: number[];

    private isSelected: boolean;
    private isSelectedSubject = new BehaviorSubject<boolean>(this.isSelected);

    private lastMousePosition: number[];

    constructor(private svg: SVGService, private grid: GridService) {

        this.lastMousePosition = [0, 0];
        this.tip = 'Selector (S)';
        this.distanceToCenter = [];
        this.selectedComposite = new SVGComposite();

        this.boxElement = DOMRenderer.createElement('polyline', 'svg', {
            fill: '#2188ff',
            'fill-opacity': '0.1',
            stroke: '#2188ff',
            'stroke-width': '1',
            'stroke-dasharray': '4',
        });

        this.previewElement = DOMRenderer.createElement('g', 'svg');
        this.previewRect = DOMRenderer.createElement('rect', 'svg', {
            'fill-opacity': '0',
            'stroke-opacity': '0.8',
            stroke: '#2188ff',
            'stroke-width': '2',
            'stroke-dasharray': '4',
        });
        DOMRenderer.appendChild(this.previewElement, this.previewRect);

        for (let i = 0; i < Compass.MAX; ++i) {
            const point: any = DOMRenderer.createElement('circle', 'svg', {
                stroke: '#2188ff',
                'stroke-width': '1',
                fill: '#2188ff',
                'fill-opacity': '0.8',
                r: '5',
            });
            DOMRenderer.appendChild(this.previewElement, point);
            this.points[i] = point;
        }

    }

    get isSelectedObservable(): Observable<boolean> {
        return this.isSelectedSubject.asObservable();
    }

    private nextIsSelected(): void {
        this.isSelectedSubject.next(this.isSelected);
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
                this.selectedComposite.clear();
                this.state = State.maybe;
                break;
            case State.selected:
                if (event.target === this.previewRect || event.target === this.points[Compass.C]) {
                    this.distanceToCenter = [
                        this.selectedComposite.position[0] - event.svgX, this.selectedComposite.position[1] - event.svgY,
                    ];
                    this.state = State.moving;
                } else {
                    this.selectedComposite.clear();
                    this.state = State.maybe;
                }
                break;
            default:
                this.state = State.idle;
        }
        return cmd;
    }

    onWheel(event: WheelEvent): boolean {
        switch (this.state) {
            case State.selected:
                this.state = State.rotating;
                if (this.transforms) {
                    CmdService.execute(this.transforms);
                }
                const transforms: CmdArray<CmdMatrix> = new CmdArray<CmdMatrix>();
                this.selected.forEach((obj: SVGAbstract) => {
                    transforms.cmds.push(new CmdMatrix(obj));
                });
                this.transforms = transforms;
            // tslint:disable-next-line: no-switch-case-fall-through
            case State.rotating:
                break;
            default:
                return false;
        }
        if (!this.transforms) {
            return false;
        }
        const angle = Math.sign(event.deltaY) * (Math.PI / 180) * (event.altKey ? 1 : 15);
        if (event.shiftKey) {
            this.transforms.cmds.forEach((cmd) => {
                const rect = MyInjector.get(SVGService).getElementRect(cmd.element);
                cmd.rotate(angle, rect.x + rect.width / 2, rect.y + rect.height / 2);
                cmd.execute();
            });
        } else {
            this.transforms.cmds.forEach((cmd) => {
                cmd.rotate(angle,
                    Number(this.points[Compass.C].getAttribute('cx')),
                    Number(this.points[Compass.C].getAttribute('cy')));
                cmd.execute();
            });
        }
        return true;
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
            case State.moving:
                this.svg.removeElement(this.previewElement);
                this.updateCompositePosition(event);
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
            case State.moving:
                this.renderPreview(this.selected);
                this.svg.addElement(this.previewElement);
            // tslint:disable-next-line: no-switch-case-fall-through
            case State.rotating:
                this.state = State.selected;
                break;
            default:
                this.state = State.idle;
        }
    }

    onKeydown(event: KeyboardEvent): boolean {
        const kbd: { [id: string]: callback } = {
            'C-a': () => this.selectAll(),
            'C-d': () => this.duplicate(),
            delete: () => this.erase(),

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

    duplicate(): void {
        this.dupOffset = this.nextOffset(this.dupOffset);
        CmdService.execute(new CmdDup(Array.from(this.selected), this.dupOffset));
    }

    erase(): void {
        const cmd: CmdEraser = new CmdEraser();
        this.selected.forEach((obj) => {
            cmd.eraseObject(obj);
        });
        CmdService.execute(cmd);
        this.reset();
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

        const currentXSteps = newOffset[0] / SelectorTool.BASE_OFFSET;
        const currentYSteps = newOffset[1] / SelectorTool.BASE_OFFSET;

        const baseHorizontalSteps = currentXSteps - currentYSteps;

        this.selected.forEach((object) => {
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
                finalOffset = vectorMultiply([baseHorizontalSteps + 1, 0], SelectorTool.BASE_OFFSET);
                break;
            default:
                finalOffset = newOffset;
        }

        return finalOffset;
    }

    private elementState(element: SVGAbstract): number {
        const rect: DOMRect = element.domRect;
        const entryPositions: DOMRect = this.svg.entry.nativeElement.getBoundingClientRect();

        const right = rect.right - entryPositions.left;
        const bottom = rect.bottom - entryPositions.top;

        let currentState = 0;
        if (right > entryPositions.right) {
            currentState = 1;
        } else if (bottom > entryPositions.bottom) {
            currentState = 2;
        }

        return currentState;
    }

    private renderPreview(toRender: Set<SVGAbstract>) {
        let x1 = Number.MAX_SAFE_INTEGER;
        let y1 = Number.MAX_SAFE_INTEGER;
        let x2 = -Number.MAX_SAFE_INTEGER;
        let y2 = -Number.MAX_SAFE_INTEGER;
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

        const width = x2 - x1;
        const height = y2 - y1;
        DOMRenderer.setAttributes(this.previewRect, {
            x: x1.toString(),
            y: y1.toString(),
            width: (width > 0 ? width : 0).toString(),
            height: (height > 0 ? height : 0).toString(),
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
            cy: ((Math.abs(y1) + Math.abs(y2)) / 2).toString(),
        });

        DOMRenderer.setAttributes(this.points[Compass.C], {
            cx: ((x1 + x2) / 2).toString(),
            cy: ((y1 + y2) / 2).toString(),
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
        this.updateCompositeSVGs();

        if (this.selected.size) {
            this.state = State.selected;
        } else {
            this.state = State.idle;
        }

        this.renderPreview(this.selected);
        this.svg.removeElement(this.boxElement);

        this.isSelected = Boolean(this.selected.size);
        this.nextIsSelected();
    }

    private updateCompositeSVGs() {
        this.selectedComposite.clear();
        this.selected.forEach((svg: SVGAbstract) => {
            this.selectedComposite.addChild(svg);
        });
    }

    private updateCompositePosition(event: MouseEvent) {
        const distance = new Point(
            this.previewRect.width.baseVal.value / 2, this.previewRect.height.baseVal.value / 2,
        );
        const mouse = new Point(
            event.svgX + this.distanceToCenter[0],
            event.svgY + this.distanceToCenter[1],
        );
        this.selectedComposite.position = this.grid.snapOnGrid(mouse, distance);
    }

    onUnSelect(): void {
        if (this.transforms) {
            CmdService.execute(this.transforms);
            this.transforms = null;
        }
        this.reset();
    }

    selectAll() {
        this.selected = new Set<SVGAbstract>(this.svg.objects);
        this.renderPreview(this.selected);
        this.svg.removeElement(this.boxElement);
        this.state = State.selected;

        this.isSelected = true;
        this.nextIsSelected();
    }

    reset() {
        this.selected.clear();
        this.selection.clear();
        this.svg.removeElement(this.boxElement);
        this.svg.removeElement(this.previewElement);
        this.state = State.idle;
        this.dupOffset = [SelectorTool.BASE_OFFSET, SelectorTool.BASE_OFFSET];

        this.isSelected = false;
        this.nextIsSelected();
    }
}
