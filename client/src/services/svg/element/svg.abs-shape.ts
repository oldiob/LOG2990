import { SVGInterface } from './svg.interface';
import { TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { vectorMultiply, vectorPlus, vectorMinus } from 'src/utils/math';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';

export abstract class AbsSVGShape implements SVGInterface {
    element: any;

    protected startingPoint: number[];
    protected endingPoint: number[];

    protected center: number[];
    protected size: number[];

    protected pointSize: number;

    fillOpacity: number;
    strokeOpacity: number;
    traceType: number;
    primary: string;
    secondary: string;

    serialize(): { [id: string]: any } {
        return {
            startingPoint: this.startingPoint,
            endingPoint: this.endingPoint,
            center: this.center,
            size: this.size,
            pointSize: this.pointSize,
            traceType: this.traceType,
            primary: this.primary,
            secondary: this.secondary,
        };
    }

    dserialize(blob: { [id: string]: any }): void {
        this.startingPoint = blob['startingPoint'];
        this.endingPoint = blob['endingPoint'];
        this.center = blob['center'];
        this.size = blob['size'];
        this.pointSize = blob['pointSize'];
        this.setTraceType(blob['traceType']);
        this.setPrimary(blob['primary']);
        this.setSecondary(blob['secondary']);
        this.setOpacities();
    }

    constructor(x: number, y: number, traceType: TraceType) {
        this.startingPoint = [x, y];
        this.endingPoint = [x, y];
        this.size = [0, 0];
        this.pointSize = 0;
        this.setTraceType(traceType);

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
        this.element = RendererProvider.renderer.createElement('g', 'svg');

        const perimeter = RendererProvider.renderer.createElement('rect', 'svg');

        RendererProvider.renderer.setAttribute(perimeter, 'stroke-width', '0.3');
        RendererProvider.renderer.setAttribute(perimeter, 'fill', 'transparent');
        RendererProvider.renderer.setAttribute(this.element, 'x', `${x}`);
        RendererProvider.renderer.setAttribute(this.element, 'y', `${y}`);
        RendererProvider.renderer.appendChild(this.element, perimeter);

        this.showPerimeter();
    }

    protected abstract isInside(x: number, y: number): boolean;
    protected abstract isAtBorder(x: number, y: number): boolean;

    isAt(x: number, y: number): boolean {
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

    abstract isIn(x: number, y: number, r: number): boolean;

    setPointSize(pointSize: number): void {
        this.pointSize = this.strokeOpacity === 0 ? 0 : pointSize;
        RendererProvider.renderer.setAttribute(this.element.children[1], 'stroke-width', this.pointSize.toString());
    }

    setPrimary(color: string): void {
        this.primary = color;
        if (this.fillOpacity === 1) {
            RendererProvider.renderer.setAttribute(this.element.children[1], 'fill', color);
        }
    }
    setSecondary(color: string): void {
        this.secondary = color;
        if (this.strokeOpacity === 1) {
            RendererProvider.renderer.setAttribute(this.element.children[1], 'stroke', color);
        }
    }

    protected setOpacities() {
        RendererProvider.renderer.setAttribute(this.element.children[1], 'fill-opacity', `${this.fillOpacity}`);
        RendererProvider.renderer.setAttribute(this.element.children[1], 'stroke-opacity', `${this.strokeOpacity}`);
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
        RendererProvider.renderer.setAttribute(this.element.children[0], 'x',
            `${Math.min(this.endingPoint[0], this.startingPoint[0]) - this.pointSize / 2}`);
        RendererProvider.renderer.setAttribute(this.element.children[0], 'y',
            `${Math.min(this.endingPoint[1], this.startingPoint[1]) - this.pointSize / 2}`);
        RendererProvider.renderer.setAttribute(this.element.children[0], 'width',
            `${Math.abs(this.startingPoint[0] - this.endingPoint[0]) + this.pointSize}`);
        RendererProvider.renderer.setAttribute(this.element.children[0], 'height',
            `${Math.abs(this.startingPoint[1] - this.endingPoint[1]) + this.pointSize}`);
    }

    protected showPerimeter() {
        RendererProvider.renderer.setAttribute(this.element.children[0], 'stroke', 'gray');
    }

    protected hidePerimeter() {
        RendererProvider.renderer.setAttribute(this.element.children[0], 'stroke', 'transparent');
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
