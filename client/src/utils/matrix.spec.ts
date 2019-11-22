import { MatrixSVG } from './matrix';

describe('MatrixSVG', () => {

    let mat: MatrixSVG;
    // let tx: number;
    // let ty: number;
    // let sx: number;
    // let sy: number;

    beforeEach(() => {
        mat = new MatrixSVG();
        // tx = Math.random();
        // ty = Math.random();
        // sx = Math.random();
        // sy = Math.random();
    });

    it('should letruct the identity matrix', () => {
        expect(mat).toBeTruthy();
        for (let i = 0; i < mat.arr.length; ++i) {
            if (i % 4 === 0) {
                expect(mat.arr[i]).toEqual(1);
            } else {
                expect(mat.arr[i]).toEqual(0);
            }
        }
    });

    it('should translate', () => {
        // TODO - Implements me
        expect(true).toBeTruthy();
    });

    it('should rotate', () => {
        // TODO - Implements me
        expect(true).toBeTruthy();
    });

    it('should scale', () => {
        // TODO - Implements me
        expect(true).toBeTruthy();
    });
});
