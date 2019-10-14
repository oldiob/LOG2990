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

    const renderer = jasmine.createSpyObj('Renderer2', ['appendChild', 'removeChild', 'setAttribute', 'createElement']);
    const provider = new MockProvider(renderer);
    const ref = jasmine.createSpyObj('ElementRef', ['nativeElement']);

    let service: GridService;

    beforeEach(() => {
        service = new GridService(provider);
        service.ref = ref;
    });

    it('should exits', () => {
        expect(service).toBeTruthy();
        expect(service.renderer).toBe(renderer);
    });

    it('should set the size correctly and redraw the grid', () => {
        const under = GridService.MIN_SIZE - 1;
        const over = GridService.MAX_SIZE + 1;
        const okay = GridService.MIN_SIZE + 1;
        spyOn(service, 'draw');
        service.size = under;
        expect(service.draw).not.toHaveBeenCalled();
        service.size = over;
        expect(service.draw).not.toHaveBeenCalled();
        service.size = okay;
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
        service.draw(2 * GridService.DEFAULT_SIZE, 2 * GridService.DEFAULT_SIZE);
        expect(renderer.setAttribute).toHaveBeenCalled();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

});
