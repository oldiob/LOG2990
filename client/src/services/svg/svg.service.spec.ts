import { SVGService } from './svg.service';
import { SVGInterface } from './element/svg.interface';

class MockProvider {
    _renderer: any;
    constructor(renderer: any) {
        this._renderer = renderer;
    }
    get renderer(): any {
        return this._renderer;
    }
}

describe('SVGService', () => {

    let X = Math.random() * 1000;
    let Y = Math.random() * 1000;
    let R = Math.random() * 1000;

    let obj = jasmine.createSpyObj('obj', ['isAt', 'isIn']);
    obj.isAt.and.returnValue(false);
    obj.isIn.and.returnValue(false);
    let objAt = jasmine.createSpyObj('obj', ['isAt', 'isIn']);
    objAt.isAt.and.returnValue(true);
    objAt.isIn.and.returnValue(false);
    let objIn = jasmine.createSpyObj('obj', ['isAt', 'isIn']);
    objIn.isAt.and.returnValue(false);
    objIn.isIn.and.returnValue(true);

    let renderer = jasmine.createSpyObj('Renderer2', ['appendChild', 'removeChild']);
    let provider = new MockProvider(renderer);
    let entry = jasmine.createSpyObj('ElementRef', ['nativeElement']);

    let service: SVGService;

    beforeEach(() => {
        service = new SVGService(provider);
        service.entry = entry;
    });

    it('should exits', () => {
        expect(service).toBeTruthy();
    });

    it('should not add null object', () => {
        expect(service.objects.length).toEqual(0);
        service.addObject(null);
        expect(service.objects.length).toEqual(0);
    });

    it('should add object to its stack and to the renderer', () => {
        service.addObject(obj);
        expect(service.objects).toContain(obj);
        expect(renderer.appendChild).toHaveBeenCalled();
    });

    it('should remove object correctly', () => {
        expect(service.removeObject()).toBeNull();
        service.addObject(obj);
        const tmp: SVGInterface | null = service.removeObject();
        expect(tmp).toBe(obj);
        expect(renderer.removeChild).toHaveBeenCalled();
    });

    it('should iterate over all objects and return the one at position (x,y) or null', () => {
        expect(service.findAt(X, Y)).toBe(null);
        service.addObject(objAt);
        expect(service.findAt(X, Y)).toBe(objAt);
        expect(objAt.isAt).toHaveBeenCalledWith(X, Y);
    });

    it('should iterate over all objects and return the one in circle (x,y) or null', () => {
        expect(service.findIn(X, Y, R)).toBe(null);
        service.addObject(objIn);
        expect(service.findIn(X, Y, R)).toBe(objIn);
        expect(objAt.isAt).toHaveBeenCalledWith(X, Y, R);
    });

    it('should clear the draw area', () => {
        // TODO - Implement me
    });

});
