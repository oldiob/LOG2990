import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { MyInjector } from 'src/utils/injector';
import { CmdDup } from './cmd.dup';

class MockSVG {
    element: any = jasmine.createSpyObj('Element', ['cloneNode']);
    translate() {
        return;
    }
}

describe('CmdDup', () => {

    let cmd: CmdDup;
    let obj: any;
    let svg: any;
    let injector: any;
    let offset: number;
    const N = 20;

    beforeEach(() => {
        offset = Math.random();
        svg = jasmine.createSpyObj('SVGService', ['addObject', 'removeObject']);
        injector = jasmine.createSpyObj('Injector', ['get']);
        obj = new MockSVG();
        injector.get.and.returnValue(svg);
        MyInjector.injector = injector;
        cmd = new CmdDup(new Array<SVGAbstract>(N).fill(obj as SVGAbstract), [offset, offset]);
    });

    it('should construct', () => {
        expect(cmd).toBeTruthy();
        expect(svg.addObject).not.toHaveBeenCalled();
        expect(svg.removeObject).not.toHaveBeenCalled();
        expect((cmd as any).offset).toEqual([offset, offset]);
    });

    it('should call addObject on svg service when executed', () => {
        cmd.execute();
        expect(svg.addObject).toHaveBeenCalled();
    });

    it('should call removeObject on svg service when undo', () => {
        cmd.execute();
        cmd.undo();
        expect(svg.removeObject).toHaveBeenCalled();
    });

    it('should call addObject on svg service when redo', () => {
        cmd.redo();
        expect(svg.addObject).toHaveBeenCalled();
    });
});
