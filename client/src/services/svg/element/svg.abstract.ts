import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { vectorMinus, vectorMultiply, vectorPlus } from 'src/utils/math';
import { SVGService } from '../svg.service';
import { MatrixSVG } from 'src/utils/matrix';

export abstract class SVGAbstract {
    matrix: MatrixSVG;

    element: any;

    constructor() {
        this.matrix = new MatrixSVG();
    }

    abstract isIn(x: number, y: number, r: number): boolean;
    isInRect?(x: number, y: number, w: number, h: number): boolean;
    moveTo?(x: number, y: number): void;

    abstract getPrimary(): string;
    abstract getSecondary(): string;
    abstract setPrimary(color: string): void;
    abstract setSecondary(color: string): void;
    protected abstract isAtAdjusted(x: number, y: number): boolean;

    get position(): number[] {
        const rect: DOMRect = this.domRect;

        return vectorPlus([rect.x, rect.y], vectorMultiply([rect.width, rect.height], 0.5));
    }

    translate(x: number, y: number): void {
        this.matrix.translate(x, y);
        this.refreshTransform();
    }

    rotate(angle: number): void {
        this.matrix.rotate(angle);
        this.refreshTransform();
    }

    rescale(sx: number, sy: number): void {
        this.matrix.scale(sx, sy);
        this.refreshTransform();
    }

    isAt(x: number, y: number): boolean {

        const adjustedXY: number[] = this.adjustXY([x, y]);
        return this.isAtAdjusted(adjustedXY[0], adjustedXY[1]);
    }

    private adjustXY(xy: number[]): number[] {
        const xyz: number[] = xy;
        xyz.push(1);

        const movedRelativePosition = [0, 0, 0];

        for (let i = 0; i < 3; i++) {
            const matrixIndexStart = i * 3;

            let sum = 0;
            for (let j = 0; j < 3; j++) {
                sum += this.matrix.arr[matrixIndexStart + j] * xyz[j];
            }

            movedRelativePosition[i] = sum;
        }

        console.log(xy, movedRelativePosition);
        return movedRelativePosition;
    }

    get domRect(): DOMRect {
        return MyInjector.get(SVGService).getElementRect(this.element);
    }

    refreshTransform(): void {
        DOMRenderer.setAttribute(this.element, 'transform', this.matrix.toString());
    }
}
