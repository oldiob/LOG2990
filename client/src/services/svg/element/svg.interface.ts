export interface SVGInterface {
    isAt(x: number, y: number): boolean;
    isIn(x: number, y: number, r: number): boolean;

    setThickness(thickness: string): void;
    setPrimary(color: string): void;
    setSecondary(color: string): void;
    toString(): string;

    addPoint(x: number, y: number): void;
}
