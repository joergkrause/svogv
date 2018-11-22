import { TestBed } from '@angular/core/testing';

import { DynamicHtmlRendererService } from './dynamichtmlrenderer.service';

describe('DynamichtmlrenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamicHtmlRendererService = TestBed.get(DynamicHtmlRendererService);
    expect(service).toBeTruthy();
  });
});
