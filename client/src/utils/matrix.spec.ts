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

    it('should be the identity matrix', () => {
        expect(mat).toBeTruthy();
        expect(mat.isIdentity()).toBeTruthy();
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

    it('should inverse', () => {
        mat.translate(Math.random(), Math.random())
            .rotate(Math.random())
            .scale(Math.random(), Math.random());
        const inv: MatrixSVG = mat.inverse();
        inv.mul(mat);
        expect(inv.isIdentity()).toBeTruthy();
    });
});
