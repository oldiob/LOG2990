import { BucketTool } from './bucket';

describe('BucketTool', () => {

    const PRIMARY = '#000';
    const SECONDARY = '#fff';

    let svgInterface: any;
    let svgService: any;
    let paletteService: any;
    let bucket: BucketTool;
    const left: MouseEvent = new MouseEvent('mousedown', { button: 0 });
    const right: MouseEvent = new MouseEvent('mousedown', { button: 2 });

    beforeEach(() => {
        svgInterface = jasmine.createSpyObj('SVGInterface',
            ['setPrimary', 'setSecondary']);

        svgService = jasmine.createSpyObj('SVGService', ['findAt']);
        svgService.findAt.and.returnValue(svgInterface);

        paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
        paletteService.getPrimary.and.returnValue(PRIMARY);
        paletteService.getSecondary.and.returnValue(SECONDARY);
        bucket = new BucketTool(svgService, paletteService);
        left.svgX = Math.floor(Math.random() * 1000);
        left.svgY = Math.floor(Math.random() * 1000);
        right.svgX = Math.floor(Math.random() * 1000);
        right.svgY = Math.floor(Math.random() * 1000);
    });

    it('should exists', () => {
        expect(bucket).toBeTruthy();
    });

    it('should change the primary color of an object on left click', () => {
        expect(bucket.onPressed(left)).toBeNull();
        expect(svgService.findAt).toHaveBeenCalledWith(left.svgX, left.svgY);
        expect(paletteService.getPrimary).toHaveBeenCalled();
        expect(svgInterface.setPrimary).toHaveBeenCalledWith(PRIMARY);
    });

    it('should change the secondary color of an object on right click', () => {
        expect(bucket.onPressed(right)).toBeNull();
        expect(svgService.findAt).toHaveBeenCalledWith(right.svgX, right.svgY);
        expect(paletteService.getSecondary).toHaveBeenCalled();
        expect(svgInterface.setSecondary).toHaveBeenCalledWith(SECONDARY);
    });

    it('should do nothing on motion', () => {
        expect(bucket.onMotion(left)).toBeUndefined();
    });

    it('should do nothingo on released', () => {
        expect(bucket.onReleased(left)).toBeUndefined();
    });
});
