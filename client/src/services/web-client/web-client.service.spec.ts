import {HttpClientModule} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {MatDialogModule } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebClientService } from './web-client.service';

describe('WebServiceService', () => {
  let service: WebClientService;
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule, MatDialogModule, BrowserAnimationsModule, BrowserDynamicTestingModule],
        providers: [WebClientService],
    });
    service = TestBed.get(WebClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
