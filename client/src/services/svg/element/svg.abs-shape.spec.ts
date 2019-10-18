import { Renderer2 } from '@angular/core';
import { TraceType } from 'src/services/tool/tool-options/abs-shape-tool';
import { AbsSVGShape } from './svg.abs-shape';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider.service';

describe('AbsSVGShape', () => {

    const renderer: Renderer2 = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'appendChild']);

    let shape: TestShape;

    const defaultStartingPoint = [1, 1];
    const defaultEndingPoint = [51, 101];

    beforeEach(() => {
        shape = new TestShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.BorderOnly, renderer);
    });

    it('should exits', () => {
        expect(shape).toBeDefined();
    });

    it('should set a starting point', () => {
        expect(shape.mStartingPoint).toEqual(defaultStartingPoint);
    });

    it('should set an ending point', () => {
        expect(shape.mEndingPoint).toEqual(defaultStartingPoint);

        shape.setCursor(defaultEndingPoint[0], defaultEndingPoint[1], false);
        expect(shape.mEndingPoint).toEqual(defaultEndingPoint);
    });

    it('should set a center', () => {
        shape.setCursor(defaultStartingPoint[0], defaultStartingPoint[0], false);
        expect(shape.mCenter).toEqual(defaultStartingPoint);

        shape.setCursor(defaultEndingPoint[0], defaultEndingPoint[1], false);
        expect(shape.mCenter).toEqual([
            defaultStartingPoint[0] + (defaultEndingPoint[0] - defaultStartingPoint[0]) / 2,
            defaultStartingPoint[1] + (defaultEndingPoint[1] - defaultStartingPoint[1]) / 2,
        ]);
    });

    it('should set a size', () => {
        shape.setCursor(defaultStartingPoint[0], defaultStartingPoint[0], false);
        expect(shape.mSize).toEqual([0, 0]);

        shape.setCursor(defaultEndingPoint[0], defaultEndingPoint[1], false);
        expect(shape.mSize).toEqual([
            (defaultEndingPoint[0] - defaultStartingPoint[0]) / 2,
            (defaultEndingPoint[1] - defaultStartingPoint[1]) / 2,
        ]);
    });

    it('should set correct colors depending of the trace type', () => {
        const color = 'color';

        const borderRenderer: Renderer2 = jasmine.createSpyObj('Renderer2', ['setAttribute']);
        RendererProvider.renderer = borderRenderer;
        shape = new TestShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.BorderOnly, renderer);
        shape.setPrimary(color);
        expect(borderRenderer.setAttribute).toHaveBeenCalledTimes(0);
        shape.setSecondary(color);
        expect(borderRenderer.setAttribute).toHaveBeenCalledTimes(1);

        const fillRenderer: Renderer2 = jasmine.createSpyObj('Renderer2', ['setAttribute']);
        shape = new TestShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.FillOnly, renderer);
        RendererProvider.renderer = fillRenderer;
        shape.setPrimary(color);
        expect(fillRenderer.setAttribute).toHaveBeenCalledTimes(1);
        shape.setSecondary(color);
        expect(fillRenderer.setAttribute).toHaveBeenCalledTimes(1);

        const fillAndBorderRenderer: Renderer2 = jasmine.createSpyObj('Renderer2', ['setAttribute']);
        shape = new TestShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.FillAndBorder, renderer);
        RendererProvider.renderer = fillAndBorderRenderer;
        shape.setPrimary(color);
        expect(fillAndBorderRenderer.setAttribute).toHaveBeenCalledTimes(1);
        shape.setSecondary(color);
        expect(fillAndBorderRenderer.setAttribute).toHaveBeenCalledTimes(2);
    });

    it('should set point size', () => {
        const pointSize = 5;
        shape = new TestShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.BorderOnly, renderer);
        shape.setPointSize(pointSize);
        expect(shape.mPointSize).toEqual(pointSize);

        shape = new TestShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.FillOnly, renderer);
        shape.setPointSize(pointSize);
        expect(shape.mPointSize).toEqual(0);

        shape = new TestShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.FillAndBorder, renderer);
        shape.setPointSize(pointSize);
        expect(shape.mPointSize).toEqual(pointSize);
    });

    it('should call the correct is at methods', () => {
        shape = new TestShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.BorderOnly, renderer);
        spyOn(shape, 'isInside');
        spyOn(shape, 'isAtBorder');
        shape.isAt(0, 0);
        expect(shape.isAtBorder).toHaveBeenCalledTimes(1);
        expect(shape.isInside).toHaveBeenCalledTimes(0);

        shape = new TestShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.FillOnly, renderer);
        spyOn(shape, 'isInside');
        spyOn(shape, 'isAtBorder');
        shape.isAt(0, 0);
        expect(shape.isAtBorder).toHaveBeenCalledTimes(0);
        expect(shape.isInside).toHaveBeenCalledTimes(1);

        shape = new TestShape(defaultStartingPoint[0], defaultStartingPoint[1], TraceType.FillAndBorder, renderer);
        spyOn(shape, 'isInside');
        spyOn(shape, 'isAtBorder');
        shape.isAt(0, 0);
        expect(shape.isAtBorder).toHaveBeenCalledTimes(1);
        expect(shape.isInside).toHaveBeenCalledTimes(1);
    });
});

class TestShape extends AbsSVGShape {
    release(): void {
        //
    }
    onShift(isShift: boolean): void {
        //
    }
    constructor(x: number, y: number, traceType: TraceType, renderer: Renderer2) {
        super(x, y, traceType);
    }

    isInside(x: number, y: number): boolean {
        return false;
    }
    isAtBorder(x: number, y: number): boolean {
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
