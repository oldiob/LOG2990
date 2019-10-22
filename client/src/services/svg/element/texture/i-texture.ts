import { SVGBrush } from '../svg.brush';
export interface ITexture {
    create(brush: SVGBrush): void;
    addPoint(brush: SVGBrush, x: number, y: number): void;
}
