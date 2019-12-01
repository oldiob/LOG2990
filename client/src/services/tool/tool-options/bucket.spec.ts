import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { BucketTool } from './bucket';

describe('BucketTool', () => {
    let renderer: any;
    let paletteService: any;
    let event: any;
    let bucket: BucketTool;

    beforeEach(() => {
        MyInjector.injector = jasmine.createSpyObj('Injector', ['get']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        event = jasmine.createSpyObj('MouseEvent', ['svgX', 'svgY']);

        DOMRenderer.renderer = renderer;

        bucket = new BucketTool(paletteService);

        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(bucket).toBeTruthy();
    });

    it('should return null if isLoaded is false when OnPressed', () => {
        (bucket as any).isLoaded = false;
        expect(bucket.onPressed(event)).toEqual(null);
    });

    it('should return void on mouse motion', () => {
        expect(bucket.onMotion(event)).toBeUndefined();
    });

    it('should return void on mouse release', () => {
        expect(bucket.onReleased(event)).toBeUndefined();
    });

    it('should return null when OnShowcase', () => {
        expect(bucket.onShowcase()).toBeNull();
    });
});
