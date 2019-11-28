import { vectorDivideVector, vectorMinus, vectorMultiplyConst, vectorMultiplyVector, vectorPlus } from 'src/utils/math';
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

    rescaleOnPoint(fixedPoint: number[], movingPoint: number[], diff: number[]) {
        const betweenPoints: number[] = vectorMinus(movingPoint, fixedPoint);

        let toScale: number[] = [1, 1];
        toScale = vectorPlus(toScale, vectorDivideVector(diff, betweenPoints));
        if (toScale[0] === 0) {
            toScale[0] += 0.01 * Math.sign(diff[0]);
        }
        if (toScale[1] === 0) {
            toScale[1] += 0.01 * Math.sign(diff[1]);
        }
        const toTranslate = vectorMinus(fixedPoint, vectorMultiplyVector(fixedPoint, toScale));

        console.log('SCALE', toScale);
        console.log('TRANSLATE', toTranslate);

        this.rescale(toScale[0], toScale[1]);
        this.translate(toTranslate[0], toTranslate[1]);
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
