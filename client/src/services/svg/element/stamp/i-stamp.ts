import { SVGStamp } from '../svg.stamp';

export interface IStamp {
    create(stamp: SVGStamp): void;
    addPoint(imagePath: string, stamp: SVGStamp, x: number, y: number): void;
}
