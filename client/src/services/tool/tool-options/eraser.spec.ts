import { CmdEraser } from 'src/services/cmd/cmd.eraser';
import { SVGService } from 'src/services/svg/svg.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { EraserTool } from './eraser';
import { SVGPencil } from 'src/services/svg/element/svg.pencil';

fdescribe('EraserTool', () => {
    let renderer: any;
    let svgService: SVGService;
    let eraser: EraserTool;
    let event: MouseEvent;
    let container: any | null;
    let children: any;
    let objectsOnHold: any;
    let spySVGAbstract;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'removeChild', 'appendChild']);
        svgService = jasmine.createSpyObj('SVGService', ['findIn', 'getPrimary', 'getSecondary', 'entry', 'addObject']);
        container = jasmine.createSpyObj('any | null', ['children']);
        spySVGAbstract = jasmine.createSpyObj('SVGAbstract', ['forEach']);
        spyOn(svgService, 'findIn').and.returnValue(spySVGAbstract);
        objectsOnHold = [];
        DOMRenderer.renderer = renderer;
        eraser = new EraserTool(svgService);
        (eraser as any).svgService = svgService;
        eraser.container = container;
        children = [];
        eraser.objectsOnHold = objectsOnHold;
        eraser.container.children = children;
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);

        DOMRenderer.renderer = renderer;
    });

    it('should exists', () => {
        expect(eraser).toBeTruthy();
    });

    it('OnPressed should equal to a new CmdEraser', () => {
        const tempCmd = new CmdEraser();
        eraser.activated = false;
        eraser.onPressed(event);
        expect(eraser.onPressed(event)).toEqual(tempCmd);
    });

    it('On release should turn activated to false', () => {
        eraser.activated = true;
        eraser.onReleased(event);
        expect(eraser.activated).toEqual(false);
    });

    it('On motion should call deleteAll if activated is equal to true', () => {
        eraser.activated = true;
        eraser.onMotion(event);
        expect(eraser.objectsOnHold.length).toBeUndefined();
    });

    it('On motion should call appendChild if activated is equal to true while objectsOnHold is not empty', () => {
        spyOn(DOMRenderer, 'appendChild');
        const tempPencil = new SVGPencil();
        (eraser as any).svgService.addObject(tempPencil);
        eraser.activated = false;
        eraser.onMotion(event);
        expect(DOMRenderer.appendChild).toHaveBeenCalled();
    });

});
