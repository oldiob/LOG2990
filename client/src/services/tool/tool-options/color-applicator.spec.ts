import { ColorApplicatorTool } from './color-applicator';

describe('BucketTool', () => {

    const PRIMARY = '#000';
    const SECONDARY = '#fff';

    let SVGAbstract: any;
    let svgService: any;
    let paletteService: any;
    let bucket: ColorApplicatorTool;
    const left: MouseEvent = new MouseEvent('mousedown', { button: 0 });
    const right: MouseEvent = new MouseEvent('mousedown', { button: 2 });

    beforeEach(() => {
        SVGAbstract = jasmine.createSpyObj('SVGAbstract',
            ['setPrimary', 'setSecondary']);

        svgService = jasmine.createSpyObj('SVGService', ['findAt']);
        svgService.findAt.and.returnValue(SVGAbstract);

        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        paletteService.getPrimary.and.returnValue(PRIMARY);
        paletteService.getSecondary.and.returnValue(SECONDARY);
        bucket = new ColorApplicatorTool(svgService, paletteService);
        left.svgX = Math.floor(Math.random() * 1000);
        left.svgY = Math.floor(Math.random() * 1000);
        right.svgX = Math.floor(Math.random() * 1000);
        right.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(bucket).toBeTruthy();
    });

    it('should change the primary color of an object on left click', () => {
        expect(bucket.onPressed(left)).toBeTruthy();
    });

    it('should change the secondary color of an object on right click', () => {
        expect(bucket.onPressed(right)).toBeTruthy();
    });
});
