import { CmdErase } from 'src/services/cmd/cmd.eraser';
import { SVGService } from 'src/services/svg/svg.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { EraserTool } from './eraser';

describe('EraserTool', () => {
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
        svgService = jasmine.createSpyObj('SVGService', ['findIn', 'getPrimary', 'getSecondary', 'entry', 'addObject', 'inRectangle']);
        container = jasmine.createSpyObj('any | null', ['children']);
        spySVGAbstract = jasmine.createSpyObj('SVGAbstract', ['forEach']);
        spyOn(svgService, 'inRectangle').and.returnValue(spySVGAbstract);
        objectsOnHold = [];
        DOMRenderer.renderer = renderer;
        eraser = new EraserTool(svgService);
        (eraser as any).svgService = svgService;
        (eraser as any).container = container;
        children = [];
        (eraser as any).objectsOnHold = objectsOnHold;
        (eraser as any).container.children = children;
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);

        DOMRenderer.renderer = renderer;
    });

    it('should exists', () => {
        expect(eraser).toBeTruthy();
    });

    it('OnPressed should equal to a new CmdEraser', () => {
        const tempCmd = new CmdErase();
        (eraser as any).isActivated = false;
        eraser.onPressed(event);
        expect(eraser.onPressed(event)).toEqual(tempCmd);
    });

    it('On release should turn isActivated to false', () => {
        (eraser as any).isActivated = true;
        eraser.onReleased(event);
        expect((eraser as any).isActivated).toEqual(false);
    });

    it('On motion should call deleteAll if isActivated is equal to true', () => {
        (eraser as any).isActivated = true;
        eraser.onMotion(event);
        expect((eraser as any).objectsOnHold.length).toBeUndefined();
    });

});
