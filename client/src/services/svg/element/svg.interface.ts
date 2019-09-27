export interface SVGInterface {
    element: any;

    isAt(x: number, y: number): boolean;
    isIn(x: number, y: number, r: number): boolean;

    setWidth(width: number): void;
    setPrimary(color: string): void;
    setSecondary(color: string): void;
    toString(): string;

    addPoint(x: number, y: number): void;
}
