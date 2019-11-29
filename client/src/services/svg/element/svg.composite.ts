import { SelectorBox } from 'src/services/tool/tool-options/selector-box';
import { vectorDivideVector, vectorMinus, vectorMultiplyConst, vectorPlus } from 'src/utils/math';
import { SVGAbstract } from './svg.abstract';

export class SVGComposite extends SVGAbstract {

    children: Set<SVGAbstract>;

    constructor() {
        super();
        this.children = new Set<SVGAbstract>();
    }

    addChild(child: SVGAbstract) {
        this.children.add(child);
    }

    removeChild(child: SVGAbstract) {
        this.children.delete(child);
    }

    clear() {
        this.children.clear();
    }

    isAt(x: number, y: number): boolean {
        return false;
    }

    isIn(x: number, y: number, r: number): boolean {
        return false;
    }

    getPrimary(): string {
        return '';
    }
    getSecondary(): string {
        return '';
    }
    setPrimary(color: string): void {
        return;
    }
    setSecondary(color: string): void {
        return;
    }
    protected isAtAdjusted(x: number, y: number): boolean {
        return false;
    }

    get position() {
        const rect = this.domRect;

        return vectorPlus([rect.x, rect.y], vectorMultiplyConst([rect.width, rect.height], 0.5));
    }

    translate(x: number, y: number): void {
        for (const child of this.children) {
            child.translate(x, y);
        }
    }

    rotate(angle: number): void {
        for (const child of this.children) {
            child.rotate(angle);
        }
    }

    rescale(x: number, y: number): void {
        for (const child of this.children) {
            child.rescale(x, y);
        }
    }

    rescaleOnPoint(selectorBox: SelectorBox, diff: number[]): void {
        const fixedPoint: number[] = selectorBox.getOppositeAnchorPosition();

        this.translate(-fixedPoint[0], -fixedPoint[1]);

        const movingPoint: number[] = selectorBox.getTargetedAnchorPosition();
        const delta: number[] = vectorMinus(fixedPoint, movingPoint);
        if (delta[0] === 0) {
            delta[0] += 0.01 * Math.sign(diff[0]);
        }
        if (delta[1] === 0) {
            delta[1] += 0.01 * Math.sign(diff[1]);
        }

        const nextDelta: number[] = vectorMinus(delta, diff);

        const toScale: number[] = vectorDivideVector(nextDelta, delta);
        if (toScale[0] < 0) {
            selectorBox.flipHorizontally();
        }
        if (toScale[1] < 0) {
            selectorBox.flipVertically();
        }

        this.rescale(toScale[0], toScale[1]);
        this.translate(fixedPoint[0], fixedPoint[1]);
    }

    get domRect(): DOMRect {
        const xRange = [Infinity, -Infinity];
        const yRange = [Infinity, -Infinity];
        this.children.forEach((child: SVGAbstract) => {
            const rect: DOMRect = child.domRect;

            xRange[0] = Math.min(xRange[0], rect.x);
            yRange[0] = Math.min(yRange[0], rect.y);
            xRange[1] = Math.max(xRange[1], rect.x + rect.width);
            yRange[1] = Math.max(yRange[1], rect.y + rect.height);
        });

        return new DOMRect(xRange[0], yRange[0], xRange[1] - xRange[0], yRange[1] - yRange[0]);
    }

}
