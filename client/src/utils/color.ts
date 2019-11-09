export class Color {

    constructor(r: number, g: number, b: number, a: number) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    }
    red: number;
    green: number;
    blue: number;
    alpha: number;

    static convertToDecimal(hex: string): number {
        return parseInt(hex, 16);
    }

    static getColorFromHex(hex: string): Color {
        let color: Color;
        const red = Color.convertToDecimal(hex.substring(1, 3));
        const green = Color.convertToDecimal(hex.substring(3, 5));
        const blue = Color.convertToDecimal(hex.substring(5, 7));
        const FULL_ALPHA = 1;
        color = new Color(red, green, blue, FULL_ALPHA);

        if (hex.length > 7) {
            const alpha = Color.convertToDecimal(hex.substring(7, 9));
            color = new Color(red, green, blue, alpha);
        }

        return color;
    }

    toString(): string {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }

    toHex(): string {
        return '#' +
            `${this.convertToHEX(this.red)}` +
            `${this.convertToHEX(this.green)}` +
            `${this.convertToHEX(this.blue)}`;
    }

    protected convertToHEX(rgb: number): string {
        let hexString = rgb.toString(16).toUpperCase();
        if (hexString.length < 2) {
            hexString = '0' + hexString;
        }
        return hexString;
    }
}
