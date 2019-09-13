/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { CurrentToolService } from './selected-tool.service';

describe('Service: CurrentTool', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentToolService]
    });
  });

  it('should ...', inject([CurrentToolService], (service: CurrentToolService) => {
    expect(service).toBeTruthy();
  }));
});
