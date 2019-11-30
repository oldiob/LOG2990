import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine, vectorMinus, vectorMultiplyConst, vectorPlus } from 'src/utils/math';
import { SVGAbstract } from './svg.abstract';

export class SVGInk extends SVGAbstract {
    private points: number[][];
    private offset: number[];
    private angles: number[];
    private radian: number;

    private readonly WIDTH_MARGIN = 10.0;

    element: any;

    constructor(angle: number, private width: number) {
        super();
        this.points = [];
        this.offset = [];
        this.angles = [];
        this.radian = 0;
        this.element = DOMRenderer.createElement('g', 'svg');
        this.setOffset(angle);
    }

    isAtAdjusted(x: number, y: number): boolean {
        const width: number = this.width + this.WIDTH_MARGIN;
        for (let i = 0; i < this.points.length - 1; i++) {
                if (isAtLine([x, y], this.points[i], this.points[i + 1], width)) {
                    return true;
                }
        }

        return false;
    }

    isIn(x: number, y: number): boolean {
        const isInside = this.isAt(x, y);

        return isInside;
    }

    getPrimary(): string {
        return '';
    }

    getSecondary(): string {
        return '';
    }

    setPrimary(color: string): void {
        DOMRenderer.setAttribute(this.element, 'fill', color);
        DOMRenderer.setAttribute(this.element, 'stroke', color);
    }

    setSecondary(color: string): void {
        return;
    }

    setAngle(newAngle: number): void {
        const lastOffset: number[] = this.offset;
        this.setOffset(newAngle);

        if (this.points.length >= 1) {
            const lastPoint: number[] = this.points[this.points.length - 1];
            this.setPathPoints(lastPoint, lastOffset, lastPoint, this.offset);
        }
    }

    addPoint(x: number, y: number): void {
        this.points.push([x, y]);
        if (this.points.length >= 2) {
            this.setPathPoints([x, y], this.offset, this.points[this.points.length - 2], this.offset);
        }
    }

    private setOffset(angle: number): void {
        this.radian = (angle / 180) * Math.PI;
        this.angles = [Math.cos(this.radian), Math.sin(this.radian)];
        this.offset = vectorMultiplyConst(this.angles, this.width / 2);
    }

    private setPathPoints(currentPoint: number[], currentOffset: number[], lastPoint: number[], lastOffset: number[]): void {
        const newPoints = [];
        newPoints.push(vectorPlus(currentPoint, currentOffset));
        newPoints.push(vectorMinus(currentPoint, currentOffset));
        newPoints.push(vectorMinus(lastPoint, lastOffset));
        newPoints.push(vectorPlus(lastPoint, lastOffset));

        let polygonPath = '';
        newPoints.forEach((p: number[]) => {
            polygonPath += ` ${p[0]},${p[1]} `;
        });

        const rect = DOMRenderer.createElement('polygon', 'svg');
        DOMRenderer.appendChild(this.element, rect);

        DOMRenderer.setAttribute(rect, 'points', polygonPath);
    }

}
