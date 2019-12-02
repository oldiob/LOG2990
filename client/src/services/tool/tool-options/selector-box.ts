import { DOMRenderer } from 'src/utils/dom-renderer';
import { vectorGetAbsolute, vectorMinus, vectorModule } from 'src/utils/math';
import { SVGService } from '../../svg/svg.service';

export enum SelectorState {
    NONE,

    SELECTING,
    DESELECTING,
    SELECTED,

    MOVING,
    SCALING,
}

export class SelectorBox {

    private readonly CIRCLE_RADIUS = 5;
    private readonly COLOR = '#2188ff';
    private circles: SVGCircleElement[];
    private rectangle: SVGRectElement;
    private anchorSquarePositions: number[][];
    private targetedAnchor: number;

    element: SVGGElement;

    constructor(private svgService: SVGService) {

        this.targetedAnchor = -1;
        this.anchorSquarePositions = [];
        this.circles = [];

        this.anchorSquarePositions.push(
            [0, 0],
            [0.5, 0],
            [1, 0],
            [1, 0.5],
            [1, 1],
            [0.5, 1],
            [0, 1],
            [0, 0.5]);

        this.element = DOMRenderer.createElement('g', 'svg');

        for (const _ of this.anchorSquarePositions) {
            const circle = DOMRenderer.createElement('circle', 'svg', {
                stroke: this.COLOR,
                'stroke-width': '1',
                fill: this.COLOR,
                'fill-opacity': '0.8',
                r: this.CIRCLE_RADIUS.toString(),
                cx: (-this.CIRCLE_RADIUS).toString(),
                cy: (-this.CIRCLE_RADIUS).toString(),
            });

            this.circles.push(circle);
            DOMRenderer.appendChild(this.element, circle);
        }

        this.rectangle = DOMRenderer.createElement('rect', 'svg', {
            'fill-opacity': '0.1',
            'stroke-opacity': '0.8',
            stroke: this.COLOR,
            'stroke-width': '2',
            'stroke-dasharray': '4',
            x: (-this.CIRCLE_RADIUS).toString(),
            y: (-this.CIRCLE_RADIUS).toString(),
            width: '0',
            height: '0',
        });
        DOMRenderer.appendChild(this.element, this.rectangle);
    }

    setBox(domRect: DOMRect): void {

        const x = domRect.x;
        const y = domRect.y;
        const width = domRect.width;
        const height = domRect.height;

        DOMRenderer.setAttributes(this.rectangle, {
            x: x.toString(),
            y: y.toString(),
            width: width.toString(),
            height: height.toString(),
        });

        for (let i = 0; i < this.anchorSquarePositions.length; i++) {
            const posX = x + this.anchorSquarePositions[i][0] * width;
            const posY = y + this.anchorSquarePositions[i][1] * height;
            DOMRenderer.setAttributes(this.circles[i], {
                cx: posX.toString(),
                cy: posY.toString(),
            });
        }

        this.addToDrawArea();
    }

    hideBox(): void {
        this.setBox(new DOMRect(-this.CIRCLE_RADIUS, -this.CIRCLE_RADIUS, 0, 0));
        this.removeFromDrawArea();
    }

    onPressed(x: number, y: number): SelectorState {

        for (let i = 0; i < this.circles.length; i++) {
            const circleX: number = this.circles[i].cx.baseVal.value;
            const circleY: number = this.circles[i].cy.baseVal.value;

            const diff: number[] = vectorMinus([x, y], [circleX, circleY]);
            if (vectorModule(diff) < this.CIRCLE_RADIUS) {
                this.targetedAnchor = i;
                return SelectorState.SCALING;
            }
        }

        this.targetedAnchor = -1;

        const rectX: number = this.rectangle.x.baseVal.value;
        const rectY: number = this.rectangle.y.baseVal.value;
        const rectW: number = this.rectangle.width.baseVal.value;
        const rectH: number = this.rectangle.height.baseVal.value;

        if (x >= rectX && y >= rectY && x <= rectX + rectW && y <= rectY + rectH) {
            return SelectorState.MOVING;
        }

        return SelectorState.NONE;
    }

    getTargetedAnchorPosition(): number[] {
        if (this.targetedAnchor < 0) {
            console.error('No anchor was targeted.');
            return [-1, -1];
        }

        return [this.circles[this.targetedAnchor].cx.baseVal.value, this.circles[this.targetedAnchor].cy.baseVal.value];
    }

    getOppositeAnchorPosition(): number[] {
        if (this.targetedAnchor < 0) {
            console.error('No anchor was targeted.');
            return [-1, -1];
        }

        const oppositeCircleIndex = this.getOppositeIndex(this.targetedAnchor);
        const oppositeCircle = this.circles[oppositeCircleIndex];

        return [oppositeCircle.cx.baseVal.value, oppositeCircle.cy.baseVal.value];
    }

    getScalingMultiplier(): number[] {
        if (this.targetedAnchor < 0) {
            console.error('No anchor was targeted.');
            return [-1, -1];
        }

        const oppositeCircleIndex = this.getOppositeIndex(this.targetedAnchor);
        return vectorGetAbsolute(
            vectorMinus(
                this.anchorSquarePositions[this.targetedAnchor],
                this.anchorSquarePositions[oppositeCircleIndex],
            ));
    }

    private getOppositeIndex(i: number): number {
        return (i + (this.circles.length / 2)) % this.circles.length;
    }

    private addToDrawArea(): void {
        // avoid duplicate
        this.removeFromDrawArea();
        this.svgService.addElement(this.element);
    }

    private removeFromDrawArea(): void {
        this.svgService.removeElement(this.element);
    }

    flipHorizontally(): void {
        const H_CENTER = 5;
        this.setReflexionFromCenter(H_CENTER);
    }
    flipVertically(): void {
        const V_CENTER = 7;
        this.setReflexionFromCenter(V_CENTER);
    }

    private setReflexionFromCenter(center: number): void {
        const diffFromCenter = center - this.targetedAnchor;
        this.targetedAnchor = (center + diffFromCenter) % this.circles.length;
    }
}
