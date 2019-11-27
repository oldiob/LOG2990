import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine, vectorMinus, vectorMultiply, vectorPlus } from 'src/utils/math';
import { SVGAbstract } from './svg.abstract';

export class SVGInk extends SVGAbstract {

    private points: number[][];
    private offset: number[];
    element: any;

    constructor(angle: number, private width: number) {
        super();
        this.points = [];
        this.element = DOMRenderer.createElement('g', 'svg');
        this.setOffset(angle);
    }

    private setOffset(angle: number) {
        const radian = (angle / 180) * Math.PI;
        const angles = [Math.cos(radian), Math.sin(radian)];
        this.offset = vectorMultiply(angles, this.width / 2);
    }

    getPrimary(): string {
        return '';
    }

    isAtAdjusted(x: number, y: number): boolean {
        const WIDTH_MARGIN = 10.0;
        const width: number = this.width + WIDTH_MARGIN;
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

    getSecondary(): string {
        return '';
    }

    setPrimary(color: string): void {
        DOMRenderer.setAttribute(this.element, 'fill', color);
        DOMRenderer.setAttribute(this.element, 'stroke', color);
    }

    setSecondary(color: string): void {
        // NO OP
    }

    setAngle(newAngle: number) {
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
