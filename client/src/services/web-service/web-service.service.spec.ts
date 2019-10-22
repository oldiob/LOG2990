import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { WebServiceService } from './web-service.service';

describe('WebServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  }));

  it('should be created', () => {
    const service: WebServiceService = TestBed.get(WebServiceService);
    expect(service).toBeTruthy();
  });
});
