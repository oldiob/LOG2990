export interface SVGInterface {
    element: any;

    isAt(x: number, y: number): boolean;
    isIn(x: number, y: number, r: number): boolean;

    setPrimary(color: string): void;
    setSecondary(color: string): void;

    serialize?(): { [id: string]: any };

    deserialize?(blob: { [id: string]: any }): void;
}
