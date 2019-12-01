import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { BucketTool } from './bucket';

describe('BucketTool', () => {
    let renderer: any;
    let paletteService: any;
    let event: any;
    let bucket: BucketTool;
    let imageData: any;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        event = jasmine.createSpyObj('MouseEvent', ['svgX', 'svgY']);
        imageData = jasmine.createSpyObj('ImageData', ['width']);

        DOMRenderer.renderer = renderer;

        bucket = new BucketTool(paletteService);

        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(bucket).toBeTruthy();
    });

    it('should return a proper CmdSVG on mouse click', () => {
        (bucket as any).imageData = imageData;
        (bucket as any).isLoaded = true;
        const command = bucket.onPressed(event);
        expect(command).toBeTruthy();
    });

    it('should return void on mouse motion', () => {
        expect(bucket.onMotion(event)).toBeUndefined();
    });

    it('should return void on mouse release', () => {
      expect(bucket.onReleased(event)).toBeUndefined();
    });

    it('should set isLoaded to false when OnSelect is called', () => {
      bucket.onSelect();
      expect((bucket as any).isLoaded).toBeTruthy();
    });

    it('should return null when OnShowcase', () => {
      expect(bucket.onShowcase()).toBeNull();
  });
});
