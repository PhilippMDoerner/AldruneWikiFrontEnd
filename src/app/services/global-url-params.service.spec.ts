import { TestBed } from '@angular/core/testing';

import { GlobalUrlParamsService } from './global-url-params.service';

describe('GlobalUrlParamsService', () => {
  let service: GlobalUrlParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalUrlParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
