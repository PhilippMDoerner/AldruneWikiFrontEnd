import { TestBed } from '@angular/core/testing';

import { DiaryentryEncounterConnectionService } from './diaryentry-encounter-connection.service';

describe('DiaryentryEncounterConnectionService', () => {
  let service: DiaryentryEncounterConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaryentryEncounterConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
