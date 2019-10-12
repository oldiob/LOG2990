import { SVGInterface } from './svg.interface';

export abstract class AbsSvgShape implements SVGInterface {
    element: any;

    abstract isAt(x: number, y: number): boolean;
    abstract isIn(x: number, y: number, r: number): boolean;

    setPrimary(color: string): void {
        throw new Error("Method not implemented.");
    }
    setSecondary(color: string): void {
        throw new Error("Method not implemented.");
    }
}
