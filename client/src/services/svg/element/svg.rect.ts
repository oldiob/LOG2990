import { SVGInterface } from 'src/services/svg/element/svg.interface';

export class SVGRect implements SVGInterface {
    addPoint(x: number, y: number): void {
        throw new Error("Method not implemented.");
    }
    TYPE: string;
    attributes: Object;


    setThickness(thickness: string): void {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
    private x1: number;
    private y1: number;
    private x2: number;
    private y2: number;

    constructor(x: number, y: number) {
        this.x1 = this.x2 = x;
        this.y1 = this.y2 = y;
    }

    isAt(x: number, y: number): boolean {
        let minX: number = this.x1;
        let maxX: number = this.x2;
        let minY: number = this.y1;
        let maxY: number = this.y2;
        if (minX > maxX) {
            const tmp: number = minX;
            minX = maxX;
            maxX = tmp;
        }
        if (minY > maxY) {
            const tmp: number = minY;
            minY = maxY;
            maxY = tmp;
        }
        return (minX <= x && x <= maxX && minY <= y && y <= maxY);
    }
    isIn(x: number, y: number): boolean {
        // TODO - Implement me
        return true;
    }
    setPrimary(color: string): void {
        // TODO - Implement me
    }
    setSecondary(color: string): void {
        // TODO - Implement me
    }
    getPrimary(): string {
        // TODO - Implement me
        return '#000';
    }
    getSecondary(): string {
        // TODO - Implement me
        return '#000';
    }
    setP2(x: number, y: number) {
        // TODO - Implement this
    }
}
