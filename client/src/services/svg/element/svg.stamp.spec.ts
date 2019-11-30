/* TODO
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { SVGService } from '../svg.service';
import { IStamp } from './stamp/i-stamp';
import { SVGStamp } from './svg.stamp';

describe('SVGStamp', () => {

    let renderer: any;
    let injector: any;
    let stamp: SVGStamp;
    let imagePath: string;
    let angle: number;
    let Istamp: IStamp;
    let X: number;
    let Y: number;
    let C: string;
    let width: number;
    let svgService: SVGService;
    let domRect: DOMRect;

    beforeEach(() => {
        X = Math.random() * 1000;
        Y = Math.random() * 1000;
        C = `#(Math.floor(Math.random() * 1000)).toString(16)`;
        angle = 0;
        width = 1;
        imagePath = '';
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        DOMRenderer.renderer = renderer;

        svgService = jasmine.createSpyObj('SVGService', ['getElementRect']);
        domRect = jasmine.createSpyObj('DOMRect', ['children']);
        spyOn(svgService, 'getElementRect').and.returnValue(domRect);

        injector = jasmine.createSpyObj('MyInjector', ['init', 'get']);
        MyInjector.injector = injector;
        spyOn(injector, 'get').and.returnValue(svgService);

        Istamp = jasmine.createSpyObj('IStamp', ['create', 'addPoint']);
        stamp = new SVGStamp(-100, -100, width, Istamp, angle, imagePath);
        stamp.imagePaths = imagePath;

    });

    it('should create', () => {
        expect(stamp).toBeTruthy();
        expect(Istamp.create).toHaveBeenCalled();
    });

    it('should return false if (x,y) is nowhere the stamp drew', () => {
        expect(stamp.isAt(X, Y)).toBeFalsy();
    });

    it('should return false if (x,y) is at where the pencil drew', () => {
        expect(stamp.isIn(X, Y, 1)).toBeFalsy();
    });

    it('should not set the primary color', () => {
        stamp.setPrimary(C);
        expect(stamp.setPrimary(C)).toBeUndefined();
    });

    it('should not set the secondary color', () => {
        stamp.setSecondary(C);
        expect(stamp.setSecondary(C)).toBeUndefined();
    });

}); */
