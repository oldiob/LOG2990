import { async, TestBed } from '@angular/core/testing';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { MatrixSVG } from 'src/utils/matrix';
import { SVGPencil } from '../svg/element/svg.pencil';
import { CmdTransform } from './cmd.matrix';

describe('cmdMatrix', () => {
    let cmdMatrix: CmdTransform;
    let renderer: any;
    let obj: SVGPencil;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [CmdTransform, SVGPencil],
        }).compileComponents();
    }));

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        DOMRenderer.renderer = renderer;
        obj = new SVGPencil();
        cmdMatrix = new CmdTransform(obj);
      });

    it('should be created', () => {
      expect(cmdMatrix).toBeTruthy();
    });

    it ('should call refreshTransform if setMatrix is called', () => {
        const matrix = new MatrixSVG();
        (cmdMatrix as any).setMatrix(matrix);
        expect((cmdMatrix as any).obj.matrix).toEqual(matrix);
    });

    it('execute should call setMatrix with newMatrix', () => {
        cmdMatrix.execute();
        expect((cmdMatrix as any).obj.matrix).toEqual(cmdMatrix.newMatrix);
    });

    it('undo should call setMatrix with oldMatrix', () => {
        cmdMatrix.undo();
        expect((cmdMatrix as any).obj.matrix).toEqual(cmdMatrix.oldMatrix);
    });

    it('redo should call execute', () => {
        cmdMatrix.redo();
        expect((cmdMatrix as any).obj.matrix).toEqual(cmdMatrix.newMatrix);
    });

    it('rotate should call setMatrix with the corresponding element', () => {
        const a = Math.floor(Math.random() * 1000);
        const tempMatrix = cmdMatrix.newMatrix;
        tempMatrix.rotate(a);
        cmdMatrix.rotate(a);
        expect((cmdMatrix as any).obj.matrix).toEqual(tempMatrix);
    });

    it('translate should call setMatrix with the corresponding element', () => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        const tempMatrix = cmdMatrix.newMatrix;
        tempMatrix.translate(x, y);
        cmdMatrix.translate(x, y);
        expect((cmdMatrix as any).obj.matrix).toEqual(tempMatrix);
    });

    it('rescale should call setMatrix with the corresponding element', () => {
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        const tempMatrix = cmdMatrix.newMatrix;
        tempMatrix.scale(x, y);
        cmdMatrix.rescale(x, y);
        expect((cmdMatrix as any).obj.matrix).toEqual(tempMatrix);
    });

});
