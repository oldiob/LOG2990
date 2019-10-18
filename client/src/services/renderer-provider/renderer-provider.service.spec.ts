import { TestBed } from '@angular/core/testing';

import { RendererProvider } from './renderer-provider.service';

describe('RendererProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RendererProvider = TestBed.get(RendererProvider);
    expect(service).toBeTruthy();
  });
});
