import { CmdSVG } from 'src/services/cmd/cmd.svg';
import { PaletteService } from 'src/services/palette/palette.service';
import { SVGBucketFill } from 'src/services/svg/element/svg.bucket-fill';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { createArray } from 'src/utils/image-manipulations';
import { MyInjector } from 'src/utils/injector';
import { BucketTool } from './bucket';
// import { ElementRef, Injectable } from '@angular/core';

fdescribe('BucketTool', () => {
    let renderer: any;
    let paletteService: any;
    let event: any;
    let bucket: BucketTool;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute', 'getContext']);
        // paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        paletteService = new PaletteService();
        event = jasmine.createSpyObj('MouseEvent', ['svgX', 'svgY']);

        DOMRenderer.renderer = renderer;

        bucket = new BucketTool(paletteService);

        event.svgX = 1;
        event.svgY = 1;
    });

    it('should exists', () => {
        expect(bucket).toBeTruthy();
    });

    it('should return null if isLoaded is false when OnPressed', () => {
        (bucket as any).isLoaded = false;
        expect(bucket.onPressed(event)).toEqual(null);
    });

    it('should return cmdSVG if isLoaded is false when OnPressed', () => {
        (bucket as any).isLoaded = true;
        (bucket as any).colorToleranceDelta = Math.floor(Math.random() * 1000);
        const width = 1;
        const height = 1;
        let array: number[] = createArray(width, height);
        array = [4, 12, 16, 20];
        const uint8Array = Uint8ClampedArray.from(array);
        (bucket as any).imageData = new ImageData(uint8Array, width, height);
        const bucketFill = new SVGBucketFill([event.svgX, event.svgY], (bucket as any).palette.primary,
                                                (bucket as any).imageData, (bucket as any).colorToleranceDelta);
        const tempCommand = new CmdSVG(bucketFill);
        expect(bucket.onPressed(event)).toEqual(tempCommand);
    });

    it('should do nothing on showcase', () => {
        (bucket as any).isLoaded = true;
        bucket.onShowcase();
        expect((bucket as any).isLoaded).toEqual(true);
    });

    it('should do nothing on motion', () => {
        (bucket as any).isLoaded = true;
        bucket.onMotion(event);
        expect((bucket as any).isLoaded).toEqual(true);
    });

    it('should do nothing on released', () => {
        (bucket as any).isLoaded = true;
        bucket.onReleased(event);
        expect((bucket as any).isLoaded).toEqual(true);
    });

    /*it('should turn isLoaded to false when OnSelect', () => {
        (bucket as any).isLoaded = true;
        bucket.onSelect();
        expect((bucket as any).isLoaded).toEqual(false);
    });*/
});
