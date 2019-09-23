import { SVGInterface } from 'src/services/svg/svg.interface';

export interface ITool {
    FILENAME: string;

    onPressed(event: MouseEvent): SVGInterface | null;
    onMotion(event: MouseEvent): void;
    onReleased(event: MouseEvent): void;
}
