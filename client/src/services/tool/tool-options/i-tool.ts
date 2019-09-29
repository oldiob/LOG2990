/**
 * Implementations of this interface should return raw SVGInterface with
 * position elements without color, thickness or texture.
 */
export interface ITool {
    readonly BUTTON_FILENAME: string;
    readonly CURSOR_FILENAME: string;

    onPressed(event: MouseEvent): void;
    onMotion(event: MouseEvent): void;
    onReleased(event: MouseEvent): void;
}

declare global {
    interface MouseEvent { svgX: number; svgY: number; }
}
