// import { Color } from 'src/utils/color';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { SVGBucketFill } from './svg.bucket-fill';
import { Color } from 'src/utils/color';
import { ImageManipulations } from 'src/utils/image-manipulations';
// import { SVGBucketFill } from './svg.bucket-fill';

fdescribe('SVGBucketFill', () => {

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

});
