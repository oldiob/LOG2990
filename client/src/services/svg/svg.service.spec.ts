import { Renderer2 } from '@angular/core';
import { SVGInterface } from './element/svg.interface';
import { SVGService } from './svg.service';

class MockProvider {
    renderers: Renderer2;
    constructor(renderer: Renderer2) {
        this.renderers = renderer;
    }
    get renderer(): Renderer2 {
        return this.renderers;
    }
}

describe('SVGService', () => {

    const X = Math.random() * 1000;
    const Y = Math.random() * 1000;
    const R = Math.random() * 1000;

    const obj = jasmine.createSpyObj('obj', ['isAt', 'isIn']);
    obj.isAt.and.returnValue(false);
    obj.isIn.and.returnValue(false);
    const objAt = jasmine.createSpyObj('obj', ['isAt', 'isIn']);
    objAt.isAt.and.returnValue(true);
    objAt.isIn.and.returnValue(false);
    const objIn = jasmine.createSpyObj('obj', ['isAt', 'isIn']);
    objIn.isAt.and.returnValue(false);
    objIn.isIn.and.returnValue(true);

    const renderer = jasmine.createSpyObj('Renderer2', ['appendChild', 'removeChild']);
    const provider = new MockProvider(renderer);
    const entry = jasmine.createSpyObj('ElementRef', ['nativeElement']);

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
