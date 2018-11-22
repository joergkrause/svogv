import { TestBed } from '@angular/core/testing';

import { DynamichtmlrenderService } from './dynamichtmlrender.service';

describe('DynamichtmlrenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamichtmlrenderService = TestBed.get(DynamichtmlrenderService);
    expect(service).toBeTruthy();
  });
});
