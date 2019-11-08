import { TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { vectorMinus, vectorMultiply, vectorPlus } from 'src/utils/math';
import { SVGAbstract } from './svg.interface';

export abstract class AbsSVGShape extends SVGAbstract {
    element: any;

    startingPoint: number[];
    protected endingPoint: number[];

    protected center: number[];
    protected size: number[];

    protected pointSize: number;

    fillOpacity: number;
    strokeOpacity: number;
    traceType: number;
    primary: string;
    secondary: string;

    constructor(x: number, y: number, traceType: TraceType) {
        super();

        this.startingPoint = [x, y];
        this.endingPoint = [x, y];
        this.size = [0, 0];
        this.pointSize = 0;
        this.setTraceType(traceType);

        this.element = DOMRenderer.createElement('g', 'svg');

        const perimeter = DOMRenderer.createElement('rect', 'svg');

        DOMRenderer.setAttribute(perimeter, 'stroke-width', '0.5');
        DOMRenderer.setAttribute(perimeter, 'fill', 'transparent');
        DOMRenderer.setAttribute(this.element, 'x', `${x}`);
        DOMRenderer.setAttribute(this.element, 'y', `${y}`);
        DOMRenderer.appendChild(this.element, perimeter);

        this.showPerimeter();
    }

    protected abstract isInside(x: number, y: number): boolean;
    protected abstract isAtBorder(x: number, y: number): boolean;

    isAtAdjusted(x: number, y: number): boolean {
        let inside = false;
        let atBorder = false;

        if (this.fillOpacity === 1) {
            inside = this.isInside(x, y);
        }
        if (this.strokeOpacity === 1) {
            atBorder = this.isAtBorder(x, y);
        }
        return inside || atBorder;
    }

    isIn(x: number, y: number, r: number): boolean {
        const tempWidth = this.pointSize;
        const tempSize = this.size;
        this.pointSize += r;
        this.size = vectorPlus(tempSize, [r / 2, r / 2]);
        const isInside = this.isAtAdjusted(x, y);
        this.pointSize = tempWidth;
        this.size = tempSize;
        return isInside;
    }

    setPointSize(pointSize: number): void {
        this.pointSize = this.strokeOpacity === 0 ? 0 : pointSize;
        DOMRenderer.setAttribute(this.element.children[1], 'stroke-width', this.pointSize.toString());
    }

    getPrimary(): string {
        return this.element.children[1].getAttribute('fill');
    }

    getSecondary(): string {
        return this.element.children[1].getAttribute('stroke');
    }

    setPrimary(color: string): void {
        this.primary = color;
        if (this.fillOpacity === 1) {
            DOMRenderer.setAttribute(this.element.children[1], 'fill', color);
        }
    }
    setSecondary(color: string): void {
        this.secondary = color;
        if (this.strokeOpacity === 1) {
            DOMRenderer.setAttribute(this.element.children[1], 'stroke', color);
        }
    }

    protected setOpacities() {
        DOMRenderer.setAttribute(this.element.children[1], 'fill-opacity', `${this.fillOpacity}`);
        DOMRenderer.setAttribute(this.element.children[1], 'stroke-opacity', `${this.strokeOpacity}`);
    }

    abstract setCursor(x: number, y: number, isShift: boolean): void;
    abstract release(): void;

    protected updateCoordinates(x: number, y: number, isShift: boolean) {
        this.endingPoint = [x, y];
        const VECTOR_TO_CENTER = vectorMultiply(vectorMinus(this.endingPoint, this.startingPoint), 0.5);

        if (isShift) {
            const RADIUS = Math.min(Math.abs(VECTOR_TO_CENTER[0]), Math.abs(VECTOR_TO_CENTER[1]));
            VECTOR_TO_CENTER[0] = Math.sign(VECTOR_TO_CENTER[0]) * RADIUS;
            VECTOR_TO_CENTER[1] = Math.sign(VECTOR_TO_CENTER[1]) * RADIUS;
        }

        this.size = [Math.abs(VECTOR_TO_CENTER[0]), Math.abs(VECTOR_TO_CENTER[1])];
        this.center = vectorPlus(VECTOR_TO_CENTER, this.startingPoint);
    }

    protected abstract setPositionAttributes(): void;

    protected updatePerimeter() {
        DOMRenderer.setAttribute(this.element.children[0], 'x',
            `${Math.min(this.endingPoint[0], this.startingPoint[0]) - this.pointSize / 2}`);
        DOMRenderer.setAttribute(this.element.children[0], 'y',
            `${Math.min(this.endingPoint[1], this.startingPoint[1]) - this.pointSize / 2}`);
        DOMRenderer.setAttribute(this.element.children[0], 'width',
            `${Math.abs(this.startingPoint[0] - this.endingPoint[0]) + this.pointSize}`);
        DOMRenderer.setAttribute(this.element.children[0], 'height',
            `${Math.abs(this.startingPoint[1] - this.endingPoint[1]) + this.pointSize}`);
    }

    showPerimeter() {
        DOMRenderer.setAttribute(this.element.children[0], 'stroke', 'gray');
    }

    hidePerimeter() {
        DOMRenderer.setAttribute(this.element.children[0], 'stroke', 'transparent');
    }

    abstract onShift(isShift: boolean): void;

    setTraceType(traceType: TraceType) {
        this.traceType = traceType;

        switch (traceType) {
            case TraceType.BorderOnly:
                this.fillOpacity = 0;
                this.strokeOpacity = 1;
                break;
            case TraceType.FillOnly:
                this.fillOpacity = 1;
                this.strokeOpacity = 0;
                break;
            case TraceType.FillAndBorder:
                this.fillOpacity = 1;
                this.strokeOpacity = 1;
                break;
        }
    }
}
