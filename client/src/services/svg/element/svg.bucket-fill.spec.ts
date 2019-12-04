// import { Color } from 'src/utils/color';
import { Color } from 'src/utils/color';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { ImageManipulations } from 'src/utils/image-manipulations';
import { MyInjector } from 'src/utils/injector';
import { SVGBucketFill } from './svg.bucket-fill';
// import { SVGBucketFill } from './svg.bucket-fill';

describe('SVGBucketFill', () => {

    let bucketFill: SVGBucketFill;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        DOMRenderer.renderer = renderer;

        const imageData = jasmine.createSpyObj('ImageData', ['width', 'height', 'data']);
        imageData.width = 1;
        imageData.height = 1;
        imageData.data = [10, 10, 10, 10];

        ImageManipulations.generateImageData = jasmine.createSpy();
        bucketFill = new SVGBucketFill([0, 0], new Color(12, 12, 12, 12), imageData, 0);
    });

    it('should exits', () => {
        expect(bucketFill).toBeTruthy();
    });

    it('should set correct dimansions', () => {
        const positions = [[10, 20], [12, 25], [15, 32]];

        (bucketFill as any).findDimensions(positions);
        expect((bucketFill as any).imagePosition).toEqual([10, 20]);
        expect((bucketFill as any).size).toEqual([6, 13]);

        (bucketFill as any).normalizePositions(positions);
        expect(positions).toEqual([[0, 0], [2, 5], [5, 12]]);
    });
});
