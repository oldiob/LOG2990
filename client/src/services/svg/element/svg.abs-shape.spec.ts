import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';
import { Renderer2 } from '@angular/core';
import { AbsSVGShape } from './svg.abs-shape';

fdescribe('AbsSVGShape', () => {

    const renderer: Renderer2 = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);
    let shape: ShitShape;

    const defaultStartingPoint = [0, 0];
    //const defaultEndingPoint = [50, 100];

    beforeEach(() => {
        shape = new ShitShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.BorderOnly, renderer);
    });

    it('should exits', () => {
        expect(shape).toBeDefined();
    });

    it('should set a starting point', () => {});
    it('should set an ending point', () => {});
    it('should set a center', () => {});
    it('should set a size', () => {});

    it('should set correct colors', () => {});
    it('should set a starting point', () => {});
    it('should set point size', () => {});

});

class ShitShape extends AbsSVGShape {

    constructor(x: number, y: number, traceType: TraceType, renderer: Renderer2) {
        super(x, y, traceType, renderer);
    }

    protected isInside(x: number, y: number): boolean {
        return false;
    }
    protected isAtBorder(x: number, y: number): boolean {
        return false;
    }
    isIn(x: number, y: number, r: number): boolean {
        return false;
    }
    setCursor(x: number, y: number, isShift: boolean): void {
        this.updateCoordinates(x, y, isShift);
    }
    protected setPositionAttributes(): void {
        return;
    }

    get mStartingPoint(): number[] {
        return this.startingPoint;
    }

    get mEndingPoint(): number[] {
        return this.endingPoint;
    }

    get mCenter(): number[] {
        return this.center;
    }

    get mSize(): number[] {
        return this.size;
    }

    get mPointSize(): number {
        return this.pointSize;
    }
}
