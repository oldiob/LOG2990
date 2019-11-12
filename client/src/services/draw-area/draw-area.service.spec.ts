import { DrawAreaService } from './draw-area.service';

describe('DrawAreaService', () => {

    let service: DrawAreaService;
    let web: any;
    let drawing: any;

    beforeEach(() => {
        web = jasmine.createSpyObj('WebClientService', ['sendDrawing']);
        drawing = jasmine.createSpy();
        service = new DrawAreaService(web);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should save the drawing', () => {
        service.save();
        expect(service.isSaved).toBeTruthy();
    });

    it('should mark the drawing as dirty', () => {
        service.dirty();
        expect(service.isSaved).toBeFalsy();
    });

    it('should upload the drawing', () => {
        service.upload(drawing);
        expect(service.isSaved).toBeTruthy();
        expect(web.sendDrawing).toHaveBeenCalled();
    });
});
