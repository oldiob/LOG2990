import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { MatrixSVG } from 'src/utils/matrix';

export class CmdTransform implements CmdInterface {

    oldMatrix: MatrixSVG;
    newMatrix: MatrixSVG;

    constructor(private obj: SVGAbstract) {
        this.oldMatrix = obj.matrix.copy();
        this.newMatrix = this.oldMatrix.copy();
    }

    private setMatrix(matrix: MatrixSVG) {
        this.obj.matrix = matrix.copy();
        this.obj.refreshTransform();
    }

    execute(): void {
        this.setMatrix(this.newMatrix);
    }

    undo(): void {
        this.setMatrix(this.oldMatrix);
    }

    redo(): void {
        this.execute();
    }

    rescale(sx: number, sy: number) {
        this.obj.rescale(sx, sy);
        this.newMatrix = this.obj.matrix.copy();
    }

    translate(tx: number, ty: number): void {
        this.obj.translate(tx, ty);
        this.newMatrix = this.obj.matrix.copy();
    }

    rotate(a: number) {
        this.obj.rotate(a);
        this.newMatrix = this.obj.matrix.copy();
    }
}
