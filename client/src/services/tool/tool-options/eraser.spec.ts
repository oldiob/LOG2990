import { CmdEraser } from 'src/services/cmd/cmd.eraser';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { EraserTool } from './eraser';

fdescribe('EraserTool', () => {
    let renderer: any;
    let svgService: any;
    let eraser: EraserTool;
    let event: MouseEvent;
    /*const spyObj = jasmine.createSpyObj('SVGPencil', ['isAtAdjusted', 'isIn', 'getPrimary', 'getSecondary',
                                                        'setPrimary', 'setSecondary', 'setWidth', 'addPoint',
                                                        'pointsAttribute']);*/

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        svgService = jasmine.createSpyObj('SVGService', ['getPrimary', 'getSecondary']);
        DOMRenderer.renderer = renderer;
        eraser = new EraserTool(svgService);

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
        // expect(e)
    });

    it('On release should accomplish all task correctly', () => {
        eraser.activated = true;
        eraser.onReleased(event);
        expect(eraser.activated).toEqual(false);
    });

});
