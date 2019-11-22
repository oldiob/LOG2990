/*
  | 0 | 1 | 2 |
  | 3 | 4 | 5 |
  |   |   |   |
*/

const re = /matrix\(\)/;

export class MatrixSVG {

    static N_ROWS = 3;
    static M_ROWS = 3;

    arr: number[];

    static fromString(str: string): MatrixSVG {
        const arr: RegExpExecArray | null = re.exec(str);
        const ret: MatrixSVG = new MatrixSVG();
        if (arr) {
            ret.arr = arr[1].split(',').map((n) => {
                let N = Number(n);
                if (isNaN(N)) {
                    N = 0;
                }
                return N;
            });
            const b = arr[1];
            const c = arr[2];
            const d = arr[3];
            const e = arr[4];
            arr[1] = c;
            arr[2] = e;
            arr[3] = b;
            arr[4] = d;
        }
        return ret;
    }

    constructor() {
        this.arr = new Array<number>(MatrixSVG.N_ROWS * MatrixSVG.M_ROWS).fill(0);
        this.arr[0] = 1;
        this.arr[4] = 1;
        this.arr[8] = 1;
    }

    static at(i: number, j: number): number {
        const index: number = j * MatrixSVG.M_ROWS + i;
        if (MatrixSVG.N_ROWS * MatrixSVG.M_ROWS <= index) {
            throw new RangeError(`Index ${index} (${i}, ${j}) out of range [0, 9)`);
        }
        return index;
    }

    translate(x: number, y: number): MatrixSVG {
        const other: MatrixSVG = new MatrixSVG();
        other.arr[2] = x;
        other.arr[5] = y;
        this.mul(other);
        return this;
    }

    rotate(a: number): MatrixSVG {
        const cos = Math.cos(a);
        const sin = Math.sin(a);
        const other: MatrixSVG = new MatrixSVG();
        other.arr[0] = cos;
        other.arr[1] = -sin;
        other.arr[3] = sin;
        other.arr[4] = cos;
        this.mul(other);
        return this;
    }

    scale(sx: number, sy: number): MatrixSVG {
        const other: MatrixSVG = new MatrixSVG();
        other.arr[0] = sx;
        other.arr[4] = sy;
        this.mul(other);
        return this;
    }

    mul(other: MatrixSVG) {
        const newArr = new Array<number>(MatrixSVG.N_ROWS * MatrixSVG.M_ROWS).fill(0);
        for (let i = 0; i < MatrixSVG.N_ROWS; ++i) {
            for (let j = 0; j < MatrixSVG.M_ROWS; ++j) {
                let acc = 0;
                for (let k = 0; k < MatrixSVG.N_ROWS; ++k) {
                    acc += this.arr[MatrixSVG.at(i, k)] * other.arr[MatrixSVG.at(k, j)];
                }
                newArr[MatrixSVG.at(i, j)] = acc;
            }
        }
        this.arr = newArr;
    }

    toString(): string {
        return `matrix(${this.arr[0]}, ${this.arr[3]}, ${this.arr[1]}, ${this.arr[4]}, ${this.arr[2]}, ${this.arr[5]})`;
    }

    copy(): MatrixSVG {
        const ret: MatrixSVG = new MatrixSVG();
        ret.arr = this.arr.slice(0);
        return ret;
    }
}
