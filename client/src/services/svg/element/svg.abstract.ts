import { DOMRenderer } from 'src/utils/dom-renderer';
import { vectorMinus, vectorPlus } from 'src/utils/math';
import { MyInjector } from 'src/utils/injector';
import { SVGService } from '../svg.service';

export abstract class SVGAbstract {
    private realPosition: number[] = [];
    private translation: number[];

    element: any;

    constructor() {
        this.translation = [0, 0];
    }

    abstract isIn(x: number, y: number, r: number): boolean;
    isInRect?(x: number, y: number, w: number, h: number): boolean;
    moveTo?(x: number, y: number): void;

    abstract getPrimary(): string;
    abstract getSecondary(): string;
    abstract setPrimary(color: string): void;
    abstract setSecondary(color: string): void;

    isAt(x: number, y: number): boolean {
        const adjustedXY = vectorMinus([x, y], this.translation);
        return this.isAtAdjusted(adjustedXY[0], adjustedXY[1]);
    }

    setPosition(x: number, y: number): void {
        if (this.realPosition.length === 0) {
            const svgService: SVGService = MyInjector.get(SVGService);
            const rect: DOMRect = svgService.getElementRect(this.element);
            this.realPosition = [rect.x + rect.width / 2, rect.y + rect.height / 2];
        }

        this.translation = [0, 0];
        const toTranslate = vectorMinus([x, y], this.realPosition);
        this.translate(toTranslate[0], toTranslate[1]);
    }

    translate(x: number, y: number): void {
        this.translation = vectorPlus(this.translation, [x, y]);

        DOMRenderer.setAttribute(this.element, 'transform', `translate(${this.translation[0]} ${this.translation[1]})`);
    }

    protected abstract isAtAdjusted(x: number, y: number): boolean;
}
