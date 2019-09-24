import { TestBed } from '@angular/core/testing';

import { ThicknessService } from './thickness.service';

describe('ThicknessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThicknessService = TestBed.get(ThicknessService);
    expect(service).toBeTruthy();
  });
});
