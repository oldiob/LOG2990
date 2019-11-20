import { vectorMinus, vectorMultiply, vectorPlus } from 'src/utils/math';
import { SVGAbstract } from './svg.abstract';

export class SVGComposite extends SVGAbstract {

    private children: SVGAbstract[];

    constructor() {
        super();
        this.children = [];
    }

    addChild(child: SVGAbstract) {
        this.children.push(child);
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

    set position(newPosition: number[]) {
        const center: number[] = this.position;
        for (const child of this.children) {
            const offset = vectorMinus(child.position, center);
            child.position = vectorPlus(newPosition, offset);
        }
    }

    get position() {
        const rect = this.domRect;

        return vectorPlus([rect.x, rect.y], vectorMultiply([rect.width, rect.height], 0.5));
    }

    translate(x: number, y: number): void {
        for (const child of this.children) {
            child.translate(x, y);
        }
    }

    scale(resizeX: number, resizeY: number): void {
        for (const child of this.children) {
            child.scale(resizeX, resizeY);
        }
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
