import { TestBed } from '@angular/core/testing';

import { RecentlyUpdatedService } from './recently-updated.service';

describe('RecentlyUpdatedService', () => {
  let service: RecentlyUpdatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentlyUpdatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
