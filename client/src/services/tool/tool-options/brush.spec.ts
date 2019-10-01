import { BrushTool } from './brush';

describe('BrushTool', () => {
    const create = jasmine.createSpy('create');
    const texture = jasmine.createSpyObj('ITexture', ['create', 'addPoint']);
    const element = jasmine.createSpyObj('SVGBrush', ['addPoint', 'setWidth', 'texture']);
    const renderer = jasmine.createSpyObj('Renderer2', ['createElement', 'setAttribute']);
    const rendererProvider = jasmine.createSpyObj('RendererProviderService', ['renderer']);
    const paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
    const event = jasmine.createSpyObj('MouseEvent', ['svgX', 'svgY']);

    let brush: BrushTool;

    beforeEach(() => {
        texture.create = create;
        texture.create.and.returnValue(null);

        rendererProvider.renderer = renderer;

        brush = new BrushTool(rendererProvider, paletteService);
        brush.element = element;
        brush.texture = texture;

        event.svgX = Math.floor(Math.random() * 1000);
        event.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(brush).toBeTruthy();
        expect(brush.renderer).toEqual(renderer);
    });

    it('should return a SVGBrush thats not null', () => {
        brush.element = element;
        const returnElement = brush.onPressed(event);
        expect(brush.element).toBeTruthy();
        expect(returnElement).toBeTruthy();
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
