import { BucketTool } from './bucket';

describe('BucketTool', () => {

    const PRIMARY = '#000';
    const SECONDARY = '#fff';

    const svgInterface = jasmine.createSpyObj('SVGInterface',
        ['setPrimary', 'setSecondary']);

    const svgService = jasmine.createSpyObj('SVGService', ['findAt']);
    svgService.findAt.and.returnValue(svgInterface);

    const svgService2 = jasmine.createSpyObj('SVGService', ['findAt']);
    svgService2.findAt.and.returnValue(null);

    const paletteService = jasmine.createSpyObj('PaletteService', ['getPrimary', 'getSecondary']);
    paletteService.getPrimary.and.returnValue(PRIMARY);
    paletteService.getSecondary.and.returnValue(SECONDARY);

    const workzoneService = jasmine.createSpyObj('WorkZoneService', ['updateBackgroundColor']);

    let bucket: BucketTool;
    let bucket2: BucketTool;
    const left: MouseEvent = new MouseEvent('mousedown', { button: 0 });
    const right: MouseEvent = new MouseEvent('mousedown', { button: 2 });

    beforeEach(() => {
        bucket = new BucketTool(svgService, paletteService, workzoneService);
        bucket2 = new BucketTool(svgService2, paletteService, workzoneService);
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

    it('should change the workzone background color on left click', () => {
        expect(bucket2.onPressed(left)).toBeNull();
        expect(svgService2.findAt).toHaveBeenCalledWith(left.svgX, left.svgY);
        expect(paletteService.getPrimary).toHaveBeenCalled();
        expect(workzoneService.updateBackgroundColor).toHaveBeenCalledWith(PRIMARY);
    });

    it('should do nothing on motion', () => {
        expect(bucket.onMotion(left)).toBeUndefined();
    });

    it('should do nothingo on released', () => {
        expect(bucket.onReleased(left)).toBeUndefined();
    });
});
