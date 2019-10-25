export interface SVGInterface {
    element: any;

    isAt(x: number, y: number): boolean;
    isIn(x: number, y: number, r: number): boolean;
    isInRect?(x: number, y: number, w: number, h: number): boolean;

    getPrimary(): string;
    getSecondary(): string;
    setPrimary(color: string): void;
    setSecondary(color: string): void;
}
