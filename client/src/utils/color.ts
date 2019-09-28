export class Color {

    private red: number;
    private green: number;
    private blue: number;
    private alpha: number;

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r;
    }

    set r(r: number) {
        this.validate(r);
        this.red = r;
    }
    get r(): number {
        return this.red;
    }

    set g(g: number) {
        this.validate(g);
        this.green = g;
    }
    get g(): number {
        return this.green;
    }

    set b(b: number) {
        this.validate(b);
        this.blue = b;
    }
    get b(): number {
        return this.blue;
    }

    set a(a: number) {
        this.validate(a);
        this.alpha = a;
    }
    get a(): number {
        return this.alpha;
    }

    toString(): string {
        return 'rgba(${this.red}, ${this.alpha}, ${this.blue}, ${this.alpha})';
    }

    private validate(color: number): void {
        if (!Number.isInteger(color) || color < 0 || color > 255) {
            throw new Error('Invalid color : ' + color);
        }
    }
}