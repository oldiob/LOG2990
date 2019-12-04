import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Compass } from 'src/utils/compass';
import { vectorMinus, vectorPlus } from 'src/utils/math';
import { DOMRenderer } from '../../utils/dom-renderer';
import { SelectorBox } from '../tool/tool-options/selector-box';

@Injectable({
    providedIn: 'root',
})
export class GridService {

    static readonly MIN_STEP = 5;
    static readonly MAX_STEP = 25;
    static readonly DEFAULT_STEP = 15;
    static readonly MIN_OPACITY = 0.1;
    static readonly MAX_OPACITY = 1.0;

    ref: ElementRef;
    anchor: Compass;
    private mStep: number = GridService.DEFAULT_STEP;
    width: number;
    height: number;
    isMagnetOn: boolean;
    isOn: boolean;
    isOnSubject: BehaviorSubject<boolean>;
    stepSubject: BehaviorSubject<number>;

    private readonly compassAnchorMap = new Map<Compass, number>([
        [Compass.NW, 0],
        [Compass.N, 1],
        [Compass.NE, 2],
        [Compass.E, 3],
        [Compass.SE, 4],
        [Compass.S, 5],
        [Compass.SW, 6],
        [Compass.W, 7],
        [Compass.C, 8],
    ]);

    constructor() {
        this.isOn = false;
        this.isOnSubject = new BehaviorSubject<boolean>(this.isOn);
        this.stepSubject = new BehaviorSubject<number>(this.mStep);
        this.isMagnetOn = false;
        this.anchor = Compass.C;
    }

    get isOnObservable(): Observable<boolean> {
        return this.isOnSubject.asObservable();
    }
    get stepObservable(): Observable<number> {
        return this.stepSubject.asObservable();
    }

    set step(step: number) {
        if (GridService.MIN_STEP <= step && step <= GridService.MAX_STEP) {
            if (step !== this.mStep) {
                this.mStep = step;
                if (this.isOn) {
                    this.draw();
                }
                this.stepSubject.next(this.mStep);
            }
        }
    }

    set opacity(opacity: number) {
        if (GridService.MIN_OPACITY <= opacity &&
            opacity <= GridService.MAX_OPACITY) {
            DOMRenderer.setAttribute(this.ref.nativeElement, 'stroke-opacity', `${opacity}`);
        }
    }

    draw(): void {
        const ctx: SVGElement = this.ref.nativeElement;
        const maxI = this.width / this.mStep;
        const maxJ = this.height / this.mStep;

        while (ctx.firstChild) {
            ctx.removeChild(ctx.firstChild);
        }
        for (let i = 0; i < maxI; ++i) {
            const positionX = i * this.mStep;
            const line = DOMRenderer.createElement('line', 'svg');
            DOMRenderer.setAttribute(line, 'x1', `${positionX}`);
            DOMRenderer.setAttribute(line, 'y1', `0`);
            DOMRenderer.setAttribute(line, 'x2', `${positionX}`);
            DOMRenderer.setAttribute(line, 'y2', `${this.height}`);
            DOMRenderer.setAttribute(line, 'stroke', 'black');
            DOMRenderer.setAttribute(line, 'stroke-width', '1');
            DOMRenderer.appendChild(ctx, line);
        }
        for (let j = 0; j < maxJ; ++j) {
            const positionY = j * this.mStep;
            const line = DOMRenderer.createElement('line', 'svg');
            DOMRenderer.setAttribute(line, 'x1', `0`);
            DOMRenderer.setAttribute(line, 'y1', `${positionY}`);
            DOMRenderer.setAttribute(line, 'x2', `${this.width}`);
            DOMRenderer.setAttribute(line, 'y2', `${positionY}`);
            DOMRenderer.setAttribute(line, 'stroke', 'black');
            DOMRenderer.appendChild(ctx, line);
        }
        this.isOn = true;
        this.isOnSubject.next(this.isOn);
    }

    clear(): void {
        const ctx: SVGElement = this.ref.nativeElement;
        while (ctx.firstChild) {
            ctx.removeChild(ctx.firstChild);
        }
        this.isOn = false;
        this.isOnSubject.next(this.isOn);
    }

    toggleGrid(): void {
        if (!this.isOn) {
            this.draw();
        } else {
            this.clear();
        }
    }

    toggleMagnet(): void {
        this.isMagnetOn = !this.isMagnetOn;
    }

    addStep(): void {
        if (this.isOn) {
            const STEP = 5;
            this.step = this.mStep + STEP;
        }
    }

    reduceStep(): void {
        if (this.isOn) {
            const STEP = 5;
            this.step = this.mStep - STEP;
        }
    }

    realDistanceToMove(box: SelectorBox, mousePosition: number[], previousMousePosition: number[]): number[] {
        const mouseDelta = vectorMinus(mousePosition, previousMousePosition);
        if (!this.isMagnetOn) {
            return mouseDelta;
        }

        const anchorIndex: number | undefined = this.compassAnchorMap.get(this.anchor);
        if (!anchorIndex) {
            return mouseDelta;
        }

        const boxOffset = vectorMinus(box.mouseOffsetFromCenter, vectorMinus(mousePosition, box.center));

        const circleToSnap: SVGCircleElement = box.circles[anchorIndex];
        const position = [circleToSnap.cx.baseVal.value, circleToSnap.cy.baseVal.value];

        const circleVirtualPosition = vectorPlus(vectorMinus(position, boxOffset), mouseDelta);
        const snappedPosition = [
            Math.round(circleVirtualPosition[0] / this.mStep) * this.mStep,
            Math.round(circleVirtualPosition[1] / this.mStep) * this.mStep];

        return vectorMinus(snappedPosition, position);
    }
}
