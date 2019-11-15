import { PaletteService } from 'src/services/palette/palette.service';
import { Color } from 'src/utils/color';
import { DropperTool } from './dropper';

describe('DropperTool', () => {

    let paletteService: PaletteService;

    let dropper: DropperTool;

    beforeEach(() => {
        paletteService = jasmine.createSpyObj('PaletteService', ['selectPrimary', 'selectSecondary']);

        dropper = new DropperTool(paletteService);

        (dropper as any).isLoaded = true;
    });

    it('should exists', () => {
        expect(dropper).toBeTruthy();
    });

    it('should return if not loaded', () => {
        (dropper as any).isLoaded = false;

        const mouse = new MouseEvent('', undefined);
        dropper.onPressed(mouse);
        expect(paletteService.selectPrimary).toHaveBeenCalledTimes(0);
        expect(paletteService.selectSecondary).toHaveBeenCalledTimes(0);

        const colorBefore = (dropper as any).currentColor;

        dropper.onMotion(mouse);
        expect((dropper as any).currentColor).toBe(colorBefore);
    });

    it('shoud load correct image data', () => {
        const imageData = jasmine.createSpyObj('ImageData', ['width', 'height', 'data']);
        imageData.width = 2;
        imageData.height = 1;
        imageData.data = [1, 2, 3, 4, 5, 6, 7, 8];

        (dropper as any).imageData  = imageData;
        (dropper as any).isLoaded  = true;

        const mouse = new MouseEvent('', undefined);
        mouse.svgX = 0;
        mouse.svgY = 0;

        dropper.onMotion(mouse);
        expect((dropper as any).currentColor).toEqual(new Color(1, 2, 3, 4));

        mouse.svgX = 1;
        mouse.svgY = 0;

        dropper.onMotion(mouse);
        expect((dropper as any).currentColor).toEqual(new Color(5, 6, 7, 8));
    });

});
