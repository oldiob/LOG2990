import { inject, TestBed } from '@angular/core/testing';
import { CurrentToolService } from './selected-tool.service';

describe('Service: CurrentTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToolService],
    });
  });

  it('should ...', inject([ToolService], (service: ToolService) => {
    expect(service).toBeTruthy();
  }));
});
