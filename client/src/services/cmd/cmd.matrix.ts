import { CmdInterface } from 'src/services/cmd/cmd.service';
import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MatrixSVG } from 'src/utils/matrix';

export class CmdMatrix implements CmdInterface {

    element: any;
    oldMatrix: MatrixSVG;
    newMatrix: MatrixSVG;

    constructor(obj: SVGAbstract) {
        this.element = obj.element;
        this.oldMatrix = MatrixSVG.fromString(this.element.getAttribute('transform'));
        this.newMatrix = this.oldMatrix.copy();
    }

    private setMatrix(matrix: MatrixSVG) {
        DOMRenderer.setAttribute(this.element, 'transform', matrix.toString());
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
