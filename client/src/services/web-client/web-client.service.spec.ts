import { TestBed } from '@angular/core/testing';

import { WebClientService } from './web-client.service';

describe('WebServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebClientService = TestBed.get(WebClientService);
    expect(service).toBeTruthy();
  });
});
