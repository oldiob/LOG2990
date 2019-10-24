import { SVGInterface } from '../../svg/element/svg.interface';

/**
 * Implementations of this interface should return raw SVGInterface with
 * position elements without color, thickness or texture.
 */

export enum LineType {
    FullLine = 0,
    DashLine = 1,
    DotLine = 2,
}
export enum JunctionType {
    Angle = 0,
    Round = 1,
    Dot = 2,
}

export interface ITool {
    width?: number;

    onPressed(event: MouseEvent): SVGInterface | null;
    onMotion(event: MouseEvent): void;
    onReleased(event: MouseEvent): void;

    onKeydown?(event: KeyboardEvent): boolean;
    onKeyup?(event: KeyboardEvent): boolean;
    onWheel?(event: WheelEvent): boolean;

    onShowcase?(width: number, height: number): SVGInterface | null;
}

declare global {
    interface MouseEvent { svgX: number; svgY: number; doubleClick: boolean; }
}
