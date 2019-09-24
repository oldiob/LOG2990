export interface SVGInterface {
    isAt(x: number, y: number): boolean;
    isIn(x: number, y: number, r: number): boolean;
    setPrimary(color: string): void;
    setSecondary(color: string): void;
    getPrimary(): string;
    getSecondary(): string;
}
