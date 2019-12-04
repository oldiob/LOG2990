import { Compass } from 'src/utils/compass';
import { vectorMinus } from 'src/utils/math';
import { DOMRenderer } from '../../utils/dom-renderer';
import { SelectorBox } from '../tool/tool-options/selector-box';
import { GridService } from './grid.service';

describe('GridService', () => {

    let renderer: any;
    let ref: any;
    let service: GridService;
    let svg: any;

    const WIDTH = Math.random() * 1000;
    const HEIGHT = Math.random() * 1000;

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['appendChild', 'removeChild', 'setAttribute', 'createElement']);
        DOMRenderer.renderer = renderer;
        ref = jasmine.createSpyObj('ElementRef', ['nativeElement']);
        svg = jasmine.createSpyObj('SVGService', ['addElement', 'removeElement']);
        service = new GridService();
        service.width = WIDTH;
        service.height = HEIGHT;
        service.ref = ref;
    });

    it('should exits', () => {
        expect(service).toBeTruthy();
    });

    it('should set the step correctly and redraw the grid', () => {
        service.isOn = true;
        const under = GridService.MIN_STEP - 1;
        const over = GridService.MAX_STEP + 1;
        const okay = GridService.MIN_STEP;
        spyOn(service, 'draw');
        service.step = under;
        expect(service.draw).not.toHaveBeenCalled();
        service.step = over;
        expect(service.draw).not.toHaveBeenCalled();
        service.step = okay;
        expect(service.draw).toHaveBeenCalled();
    });

    it('should set the opacity correctly', () => {
        const under = GridService.MIN_OPACITY - 1;
        const over = GridService.MAX_OPACITY + 1;
        const okay = (GridService.MAX_OPACITY + GridService.MIN_OPACITY) / 2;
        service.opacity = under;
        expect(renderer.setAttribute).not.toHaveBeenCalled();
        service.opacity = over;
        expect(renderer.setAttribute).not.toHaveBeenCalled();
        service.opacity = okay;
        expect(renderer.setAttribute).toHaveBeenCalled();
    });

    it('should draw a grid', () => {
        service.draw();
        expect(renderer.setAttribute).toHaveBeenCalled();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

    it('should calculate the real distance to move', () => {
        const pos: number[] = [27, 4];
        const prevPos: number[] = [4, 4];
        const box: SelectorBox = new SelectorBox(svg);
        box.setBox(new DOMRect(0, 0, 8, 8));
        service.anchor = Compass.E;
        (service as any).mStep = 5;
        const move: number[] = service.realDistanceToMove(box, pos, prevPos);
        const result = vectorMinus(pos, prevPos);
        expect(result[0]).toEqual(move[0]);
        expect(result[1]).toEqual(move[1]);
    });

});
