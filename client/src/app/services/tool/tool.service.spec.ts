import { inject, TestBed } from '@angular/core/testing';
import { ToolService } from './tool.service';

fdescribe('Service: CurrentTool', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ToolService],
		});
	});

	it('should ...', inject([ToolService], (service: ToolService) => {
		expect(service).toBeTruthy();
	}));
});
