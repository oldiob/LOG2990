import { TestBed } from '@angular/core/testing';

import { Drawing } from '../draw-area/i-drawing';
import { DrawAreaService } from './draw-area.service';

describe('DrawAreaService', () => {

    let service: DrawAreaService;
    let drawing: Drawing;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.get(DrawAreaService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should save the drawing', () => {
        service.save(drawing);
        expect(service.isSavedDrawing).toBeTruthy();
    });

    it('should mark the drawing as dirty', () => {
        service.dirty();
        expect(service.isSavedDrawing).toBeFalsy();
    });
});
