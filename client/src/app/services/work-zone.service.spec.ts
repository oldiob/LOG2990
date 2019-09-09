import { TestBed } from '@angular/core/testing';

import { WorkZoneService } from './work-zone.service';

describe('WorkZoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkZoneService = TestBed.get(WorkZoneService);
    expect(service).toBeTruthy();
  });
});
