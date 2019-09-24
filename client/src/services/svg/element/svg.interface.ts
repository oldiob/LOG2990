export interface SVGInterface {
    readonly TYPE: string;

    attributes: any;

    isAt(x: number, y: number): boolean;
    isIn(x: number, y: number, r: number): boolean;

    setThickness(thickness: string): void;
    setPrimary(color: string): void;
    setSecondary(color: string): void;
    getPrimary(): string;
    getSecondary(): string;
    toString(): string;

    addPoint(x: number, y: number): void;
}
