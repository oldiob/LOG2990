import { CmdComposite } from 'src/services/cmd/cmd.array';
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
        svgService = jasmine.createSpyObj('SVGService', ['findIn', 'getPrimary', 'getSecondary', 'entry', 'getElementRect',
            'removeElement', 'addObject', 'inRectangle', 'objects', 'removeObject']);

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

    it('On release should turn isActivated to false', () => {
        (eraser as any).isActivated = true;
        (eraser as any).cmd = new CmdComposite();
        eraser.onReleased(event);
        expect((eraser as any).isActivated).toEqual(false);
    });

    it('On motion should call deleteAll if isActivated is equal to true', () => {
        (eraser as any).isActivated = true;
        (eraser as any).surroundingRect = jasmine.createSpyObj('any', ['children']);
        (eraser as any).surroundingRect.children = jasmine.createSpyObj('any', ['length']);
        (eraser as any).surroundingRect.children.length = 0;
        spyOn(MyInjector.injector, 'get').withArgs(SVGService).and.returnValue(svgService);
        svgService.objects = [];

        spyOn(svgService, 'getElementRect').and.returnValue(new DOMRect(0, 0, 10, 10));
        eraser.onPressed(event);
        expect((eraser as any).objectsOnHold.length).toBe(0);
    });

});
