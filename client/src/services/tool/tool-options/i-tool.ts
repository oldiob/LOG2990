import { SVGService } from 'src/services/svg/svg.service';
import { SVGInterface } from 'src/services/svg/element/svg.interface';

/**
 * Implementations of this interface should return raw SVGInterface with
 * position elements without color, thickness or texture.
 */
export interface ITool {
    readonly BUTTON_FILENAME: string;
    readonly CURSOR_FILENAME: string;

    width: number | null;

    onPressed(event: MouseEvent): SVGInterface | null;
    onMotion(event: MouseEvent): void;
    onReleased(event: MouseEvent): void;
}

declare global {
    interface MouseEvent { svgX: number; svgY: number; }
}
