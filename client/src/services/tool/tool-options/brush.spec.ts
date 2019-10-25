import { DOMRenderer } from 'src/utils/dom-renderer';
import { MyInjector } from 'src/utils/injector';
import { BrushTool } from './brush';

describe('BrushTool', () => {
    let create: any;
    let texture: any;
    let element: any;
    let renderer: any;
    let paletteService: any;
    let event: any;
    let brush: BrushTool;
    let injector: any;
    let svg: any;

    beforeEach(() => {
        injector = jasmine.createSpyObj('MyInjector', ['get']);
        svg = jasmine.createSpyObj('SVGService', ['addObject', 'removeObject'])
        injector.get.and.returnValue(svg);
        create = jasmine.createSpy('create');
        texture = jasmine.createSpyObj('ITexture', ['create', 'addPoint']);
        element = jasmine.createSpyObj('SVGBrush', ['addPoint', 'setWidth', 'texture']);
        renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        event = jasmine.createSpyObj('MouseEvent', ['svgX', 'svgY']);
        texture.create = create;
        texture.create.and.returnValue(null);

        DOMRenderer.renderer = renderer;
        MyInjector.injector = injector;

        brush = new BrushTool(paletteService);
        brush.element = element;
        brush.texture = texture;

        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(brush).toBeTruthy();
    });

    it('should return a SVGBrush thats not null, only if no element is currently manipulated', () => {
        brush.element = null;
        brush.onPressed(event);
        expect(brush.element).toBeTruthy();
        expect(svg.addObject).toHaveBeenCalled();
    });

    it('should add a point to the newly created element', () => {
        brush.element = element;
        brush.onMotion(event);
        expect(element.addPoint).toHaveBeenCalledWith(event.svgX, event.svgY);
    });

    it('should do nothingo on released', () => {
        expect(brush.onReleased(event)).toBeUndefined();
    });
});
