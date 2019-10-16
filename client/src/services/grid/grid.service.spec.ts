import { GridService } from './grid.service';

class MockProvider {
    _renderer: any;
    constructor(renderer: any) {
        this._renderer = renderer;
    }
    get renderer(): any {
        return this._renderer;
    }
}

describe('GridService', () => {

    let renderer: any;
    let provider: any;
    let ref: any;
    let service: GridService;

    const WIDTH = Math.random() * 1000;
    const HEIGHT = Math.random() * 1000;

    beforeEach(() => {
        renderer = jasmine.createSpyObj('Renderer2', ['appendChild', 'removeChild', 'setAttribute', 'createElement']);
        provider = new MockProvider(renderer);
        ref = jasmine.createSpyObj('ElementRef', ['nativeElement']);
        service = new GridService(provider);
        service.width = WIDTH;
        service.height = HEIGHT;
        service.ref = ref;
    });

    it('should exits', () => {
        expect(service).toBeTruthy();
        expect(service.renderer).toBe(renderer);
    });

    it('should set the step correctly and redraw the grid', () => {
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

});
