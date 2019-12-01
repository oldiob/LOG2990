import { async, TestBed } from '@angular/core/testing';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { MatrixSVG } from 'src/utils/matrix';
import { SVGPencil } from '../svg/element/svg.pencil';
import {CmdMatrix} from './cmd.matrix';

describe('cmdEraser', () => {
    let cmdMatrix: CmdMatrix;
    let renderer: any;
    let obj: any;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [CmdMatrix],
        }).compileComponents();
    }));

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        DOMRenderer.renderer = renderer;
        obj = new SVGPencil();
        cmdMatrix = new CmdMatrix(obj);
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
        const x = Math.floor(Math.random() * 1000);
        const y = Math.floor(Math.random() * 1000);
        const tempMatrix = cmdMatrix.newMatrix;
        tempMatrix
            .translate(-x, -y)
            .rotate(a)
            .translate(x, y);
        cmdMatrix.rotate(a, x, y);
        expect((cmdMatrix as any).obj.matrix).toEqual(tempMatrix);
    });

});
