import { SVGInterface } from 'src/services/svg/element/svg.interface';

/**
 * Implementations of this interface should return raw SVGInterface with
 * position elements without color, thickness or texture.
 */
export interface ITool {
    readonly FILENAME: string;
    element: SVGInterface | null;

    onPressed(event: MouseEvent): void;
    onMotion(event: MouseEvent): void;
    onReleased(event: MouseEvent): void;
}
