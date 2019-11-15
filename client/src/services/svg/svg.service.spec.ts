import { DOMRenderer } from '../../utils/dom-renderer';
import { SVGAbstract } from './element/svg.abstract';
import { SVGService } from './svg.service';

describe('SVGService', () => {

    const X = Math.random() * 1000;
    const Y = Math.random() * 1000;
    const R = Math.random() * 1000;

    let obj: any;
    let objAt: any;
    let objIn: any;
    let renderer: any;
    let elem: any;
    let entry: any;
    let service: SVGService;

    beforeEach(() => {
        obj = jasmine.createSpyObj('obj', ['isAt', 'isIn', 'element']);
        obj.isAt.and.returnValue(false);
        obj.isIn.and.returnValue(false);
        objAt = jasmine.createSpyObj('obj', ['isAt', 'isIn']);
        objAt.isAt.and.returnValue(true);
        objAt.isIn.and.returnValue(false);
        objIn = jasmine.createSpyObj('obj', ['isAt', 'isIn']);
        objIn.isAt.and.returnValue(true);
        objIn.isIn.and.returnValue(false);

        renderer = jasmine.createSpyObj('Renderer2', ['appendChild', 'removeChild', 'createElement',
            'setAttribute']);
        DOMRenderer.renderer = renderer;

        elem = jasmine.createSpyObj('any', ['hasChildNodes', 'appendChild', 'removeChild', 'firstChild']);
        elem.hasChildNodes.and.returnValue(false);
        entry = jasmine.createSpyObj('ElementRef', ['nativeElement']);
        entry.nativeElement = elem;
        service = new SVGService();
        service.entry = entry;
    });

    it('should exists', () => {
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
        service.addObject(obj);
        service.removeObject(obj);
        expect(renderer.removeChild).toHaveBeenCalled();
    });

    it('should iterate over all objects and return the one at position (x,y) or null', () => {
        expect(service.findAt(X, Y)).toBe(null);
        service.addObject(objAt);
        expect(service.findAt(X, Y)).toBe(objAt);
        expect(objAt.isAt).toHaveBeenCalledWith(X, Y);
    });

    it('should iterate over all objects and return the one in circle (x,y, r) or null', () => {
        let actualList: (SVGAbstract | null)[] = service.findIn(X, Y, R);
        let expectedList: (SVGAbstract | null)[] = [];

        actualList.forEach((element) => expectedList.push(null));
        expect(actualList).toEqual(expectedList);

        service.addObject(objIn);
        actualList = service.findIn(X, Y, R);

        let foundElement: SVGAbstract | null = null;
        actualList = actualList.filter((element) => {
            if (element === objIn) {
                foundElement = element;
                return false;
            }

            return true;
        });

        expect(foundElement).toEqual(objIn);

        expectedList = [];
        actualList.forEach((element) => expectedList.push(null));
        expect(actualList).toEqual(expectedList);
    });

    it('should clear the draw area', () => {
        service.clearObjects();
        expect(elem.hasChildNodes).toHaveBeenCalled();
        expect(elem.removeChild).not.toHaveBeenCalled();
        expect(renderer.appendChild).toHaveBeenCalled();
    });

});
