import { TestBed } from '@angular/core/testing';

import { WarningsService } from './warnings.service';

describe('WarningsService', () => {
  let service: WarningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
