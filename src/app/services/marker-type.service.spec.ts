import { TestBed } from '@angular/core/testing';

import { MarkerTypeService } from './marker-type.service';

describe('MarkerTypeService', () => {
  let service: MarkerTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
