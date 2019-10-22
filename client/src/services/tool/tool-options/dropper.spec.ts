import { PaletteService } from 'src/services/palette/palette.service';
import { SVGService } from 'src/services/svg/svg.service';
import { Color } from 'src/utils/color';
import { DropperTool } from './dropper';

describe('DropperTool', () => {

    let svgService: SVGService;
    let paletteService: PaletteService;

    let dropper: DropperTool;

    beforeEach(() => {
        svgService = jasmine.createSpyObj('SVGService', ['entry']);
        paletteService = jasmine.createSpyObj('PaletteService', ['selectPrimary', 'selectSecondary']);

        dropper = new DropperTool(svgService, paletteService);

        dropper.loaded = true;
    });

    it('should exists', () => {
        expect(dropper).toBeTruthy();
    });

    it('should return if not loaded', () => {
        dropper.loaded = false;

        const mouse = new MouseEvent('', undefined);
        dropper.onPressed(mouse);
        expect(paletteService.selectPrimary).toHaveBeenCalledTimes(0);
        expect(paletteService.selectSecondary).toHaveBeenCalledTimes(0);

        const spy = spyOn(dropper, 'getPixelData');
        dropper.onMotion(mouse);
        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('shoud load correct image data', () => {
        const imageData = jasmine.createSpyObj('ImageData', ['width', 'height', 'data']);
        imageData.width = 2;
        imageData.height = 1;
        imageData.data = [1, 2, 3, 4, 5, 6, 7, 8];

        dropper.imageData = imageData;

        const mouse = new MouseEvent('', undefined);
        mouse.svgX = 0;
        mouse.svgY = 0;

        dropper.onMotion(mouse);
        expect(dropper.currentColor).toEqual(new Color(1, 2, 3, 4));

        mouse.svgX = 1;
        mouse.svgY = 0;

        dropper.onMotion(mouse);
        expect(dropper.currentColor).toEqual(new Color(5, 6, 7, 8));
    });

});
