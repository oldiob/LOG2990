export interface SVGInterface {
    isAt(x: number, y: number): boolean;
    isIn(x: number, y: number, r: number): boolean;
    setPrimary(color: number): void;
    setSecondary(color: number): void;
    getPrimary(): number;
    getSecondary(): number;
}
