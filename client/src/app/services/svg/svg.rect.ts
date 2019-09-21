import { SVGInterface } from 'src/app/services/svg/svg.interface';

export class SVGRect implements SVGInterface {
    private x1, y1, x2, y2: number;

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
            let tmp: number = minX;
            minX = maxX;
            maxX = tmp;
        }
        if (minY > maxY) {
            let tmp: number = minY;
            minY = maxY;
            maxY = tmp;
        }
        return (minX <= x && x <= maxX && minY <= y && y <= maxY);
    }
    isIn(x: number, y: number): boolean {
        // TODO - Implement me
        return true;
    }
    setPrimary(color: number): void {
        // TODO - Implement me
    }
    setSecondary(color: number): void {
        // TODO - Implement me
    }
    getPrimary(color: number): number {
        // TODO - Implement me
        return 0;
    }
    getSecondary(color: number): number {
        // TODO - Implement me
        return 0;
    }
}
