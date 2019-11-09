import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOMRenderer } from '../../utils/dom-renderer';

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
    mStep: number = GridService.DEFAULT_STEP;
    width: number;
    height: number;
    isOn: boolean;
    isOnSubject: BehaviorSubject<boolean>;
    stepSubject: BehaviorSubject<number>;

    constructor() {
        this.isOn = false;
        this.isOnSubject = new BehaviorSubject<boolean>(this.isOn);
        this.stepSubject = new BehaviorSubject<number>(this.mStep);
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
                this.draw();
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

    toggle(): void {
        if (!this.isOn) {
            this.draw();
        } else {
            this.clear();
        }
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
}
