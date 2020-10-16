import { TestBed } from '@angular/core/testing';

import { DiaryentryService } from './diaryentry.service';

describe('DiaryentryService', () => {
  let service: DiaryentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaryentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
