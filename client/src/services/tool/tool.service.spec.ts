import { inject, TestBed } from '@angular/core/testing';
import { Brush } from './tool-options/brush';
import { Pencil } from './tool-options/pencil';
import { ToolService } from './tool.service';

describe('Service: CurrentTool', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ToolService],
        });
    });

    it('Should create a truthy ToolService.', inject([ToolService], (service: ToolService) => {
        expect(service).toBeTruthy();
    }));

    it('Should select valid tool categories.', inject([ToolService], (service: ToolService) => {
        expect(service.getToolCategoryIndex()).toEqual(0);
        service.setToolCategoryIndex(1);
        expect(service.getToolCategoryIndex()).toEqual(1);
    }));

    it('Should not let select invalid tool categories.', inject([ToolService], (service: ToolService) => {
        expect(() => {
            service.setToolCategoryIndex(0.23);
        }).toThrowError('Tool category index is not an Integer.');
        expect(() => {
            service.setToolCategoryIndex(2);
        }).toThrowError('Tool category index is greater that the number of tools.');
        expect(() => { service.setToolCategoryIndex(-1); }).toThrowError('Tool category index is negative.');
    }));

    it('Should select valid tools.', inject([ToolService], (service: ToolService) => {
        expect(service.getCurrentToolIndex()).toEqual(0);
        expect(service.getCurrentTool() instanceof Pencil).toBe(true);

        service.setCurrentToolIndex(1);
        expect(service.getCurrentToolIndex()).toEqual(1);
        expect(service.getCurrentTool() instanceof Brush).toBe(true);
    }));
});
