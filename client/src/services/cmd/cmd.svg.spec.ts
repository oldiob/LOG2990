import { SVGAbstract } from 'src/services/svg/element/svg.interface';
import { MyInjector } from 'src/utils/injector';
import { CmdSVG } from './cmd.svg';

class MockSVG {
    element: any = jasmine.createSpyObj('Element', ['cloneNode']);
    translate() {
        return;
    }
}

describe('CmdCut', () => {

    let cmd: CmdSVG;
    let obj: any;
    let svg: any;
    let svgAbstract: any;
    let injector: any;
    const N = 20;

    beforeEach(() => {
        svg = jasmine.createSpyObj('SVGService', ['addObject', 'removeObject']);
        injector = jasmine.createSpyObj('Injector', ['get']);
        svgAbstract = jasmine.createSpyObj('SVGAbstract', ['createElement']);
        obj = new MockSVG();
        injector.get.and.returnValue(svg);
        MyInjector.injector = injector;
        cmd = new CmdSVG(new Array<SVGAbstract>(N).fill(obj as SVGAbstract));
        cmd.svg = svg;
    });

    it('should construct with an SVGAbstract array as a parameter', () => {
        expect(cmd).toBeTruthy();
    });

    it('should construct with an SVGAbstract as a parameter', () => {
        cmd = new CmdSVG(svgAbstract);
        expect(cmd).toBeTruthy();
    });

    it('should call RemoveObject on svg service when executed', () => {
        cmd.execute();
        expect(svg.addObject).toHaveBeenCalled();
    });

    it('should call addObject on svg service when undo', () => {
        cmd.undo();
        expect(svg.removeObject).toHaveBeenCalled();
    });

    it('should call execute on svg service when redo', () => {
        cmd.redo();
        expect(svg.addObject).toHaveBeenCalled();
    });
});
