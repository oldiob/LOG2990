import { SVGInterface } from 'src/services/svg/element/svg.interface';

/**
 * Implementations of this interface should return raw SVGInterface with
 * position elements without color, thickness or texture.
 */
export interface ITool {
    readonly FILENAME: string;
    element: SVGInterface | null;
    width: number;

    onPressed(x: number, y: number): void;
    onMotion(x: number, y: number): void;
    onReleased(x: number, y: number): void;
}
