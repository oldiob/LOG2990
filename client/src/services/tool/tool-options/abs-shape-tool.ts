import { AbsSVGShape } from 'src/services/svg/element/svg.abs-shape';
import { ITool } from './i-tool';

export enum TraceType {
    BorderOnly = 0,
    FillOnly = 1,
    FillAndBorder = 2,
}

export abstract class AbsShapeTool implements ITool {
    width: number;
    traceType: TraceType;
    angle: number;
    element: AbsSVGShape | null;

    protected setElementAttributes(primaryColor: string, secondaryColor: string, width: number) {
        if (this.element !== null) {
            this.element.setPrimary(primaryColor);
            this.element.setSecondary(secondaryColor);
            this.element.setPointSize(width);
        }
    }

    abstract onPressed(event: MouseEvent): AbsSVGShape | null;
    onMotion(event: MouseEvent): void {
        if (this.element !== null) {
            this.element.setCursor(event.svgX, event.svgY, event.shiftKey);
        }
    }
    onReleased(event: MouseEvent): void {
        if (this.element !== null) {
            this.element.release();
        }

        this.element = null;
    }

    onKeydown(event: KeyboardEvent): boolean {
        if (event.key === 'Shift') {
            return this.onShift(true);
        }
        return false;
    }
    onKeyup(event: KeyboardEvent): boolean {
        if (event.key === 'Shift') {
            return this.onShift(false);
        }
        return false;
    }

    private onShift(isShift: boolean): boolean {
        if (this.element !== null) {
            this.element.onShift(isShift);
            return true;
        }
        return false;
    }
}
