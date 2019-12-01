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

        event.svgX = Math.floor(Math.random() * 10);
        event.svgY = Math.floor(Math.random() * 10);
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
        const width = Math.floor(Math.random() * 1000);
        const height = Math.floor(Math.random() * 1000);
        const array: number[] = createArray(width, height);
        const uint8Array = Uint8ClampedArray.from(array);
        (bucket as any).imageData = new ImageData(uint8Array, width, height);
        const position = [event.svgX, event.svgY];
        const bucketFill = new SVGBucketFill(position, (bucket as any).palette.primary,
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
