import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { MatrixSVG } from 'src/utils/matrix';

export class CmdMatrix implements CmdInterface {

    oldMatrix: MatrixSVG;
    newMatrix: MatrixSVG;

    constructor(private obj: SVGAbstract) {
        this.oldMatrix = obj.matrix.copy();
        this.newMatrix = this.oldMatrix.copy();
    }

    private setMatrix(matrix: MatrixSVG) {
        this.obj.matrix = matrix;
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

    translate(tx: number, ty: number): void {
        return;
    }

    rotate(a: number, x: number, y: number) {
        this.newMatrix
            .translate(-x, -y)
            .rotate(a)
            .translate(x, y);
        this.setMatrix(this.newMatrix);
    }
}
