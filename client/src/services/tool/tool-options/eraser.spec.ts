import { CmdEraser } from 'src/services/cmd/cmd.eraser';
import { SVGService } from 'src/services/svg/svg.service';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { EraserTool } from './eraser';

fdescribe('EraserTool', () => {
    let renderer: any;
    let svgService: SVGService;
    let eraser: EraserTool;
    let event: MouseEvent;
    let container: any | null;
    let children: any;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'removeChild', 'appendChild']);
        svgService = jasmine.createSpyObj('SVGService', ['getPrimary', 'getSecondary', 'entry']);
        container = jasmine.createSpyObj('any | null', ['children']);
        DOMRenderer.renderer = renderer;
        eraser = new EraserTool(svgService);
        (eraser as any).svgService = svgService;
        eraser.container = container;
        children = [];
        eraser.container.children = children;
        event = new MouseEvent('mousedown');
        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);

        DOMRenderer.renderer = renderer;
    });

    it('should exists', () => {
        expect(eraser).toBeTruthy();
    });

    it('OnPressed should accomplished its task normally', () => {
        const tempCmd = new CmdEraser();
        eraser.activated = false;
        eraser.onPressed(event);
        expect(eraser.onPressed(event)).toEqual(tempCmd);
    });

    it('On release should accomplish all task correctly', () => {
        eraser.activated = true;
        eraser.onReleased(event);
        expect(eraser.activated).toEqual(false);
    });

});
