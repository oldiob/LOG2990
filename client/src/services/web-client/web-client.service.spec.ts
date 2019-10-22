import {HttpClientModule} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { WebClientService } from './web-client.service';

describe('WebServiceService', () => {
  let service: WebClientService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [WebClientService]
    });
    service = TestBed.get(WebClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
