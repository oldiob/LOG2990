import { DOMRenderer } from 'src/utils/dom-renderer';
import { IStamp } from './stamp/i-stamp';
import { SVGStamp } from './svg.stamp';

describe('SVGStamp', () => {

    let renderer: any;
    let stamp: SVGStamp;
    let imagePath: string;
    let angle: number;
    let Istamp: IStamp;
    let X: number;
    let Y: number;
    let C: string;
    let width: number;

    beforeEach(() => {
        X = Math.random() * 1000;
        Y = Math.random() * 1000;
        C = `#(Math.floor(Math.random() * 1000)).toString(16)`;
        angle = 0;
        width = 1;
        imagePath = '';
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        DOMRenderer.renderer = renderer;

        Istamp = jasmine.createSpyObj('IStamp', ['create', 'addPoint']);
        stamp = new SVGStamp(width, Istamp, angle, imagePath);
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
        expect(stamp.isIn(X, Y)).toBeFalsy();
    });

    it('should not set the primary color', () => {
        stamp.setPrimary(C);
        expect(stamp.setPrimary(C)).toBeUndefined();
    });

    it('should not set the secondary color', () => {
        stamp.setSecondary(C);
        expect(stamp.setSecondary(C)).toBeUndefined();
    });

    it('should add point to the points list', () => {
        stamp.addPoint(X, Y);
        expect(stamp.points).toContain([X, Y]);
        expect(Istamp.addPoint).toHaveBeenCalled();
    });

});
