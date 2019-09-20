import { TestBed } from '@angular/core/testing';
import { ToolCategory } from './tool-category';

fdescribe('Service: CurrentTool', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ToolCategory],
		});
	});

	it("Should not create a ToolCategory without tools.", () => {
		
	});
});
