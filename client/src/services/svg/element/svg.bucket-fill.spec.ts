// import { Color } from 'src/utils/color';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
// import { SVGBucketFill } from './svg.bucket-fill';

describe('SVGBucketFill', () => {
    let renderer: any;
    let event: any;
    // let bucketFill: SVGBucketFill;
    // let imageData;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        event = jasmine.createSpyObj('MouseEvent', ['svgX', 'svgY']);
        // imageData = jasmine.createSpyObj('ImageData', ['width']);

        DOMRenderer.renderer = renderer;
/*
        const position = [1, 1];
        const color = new Color(1, 1, 1, 1);
        const tolerance = 1;
*/
        // bucketFill = new SVGBucketFill(position, color, imageData, tolerance);

        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

});
