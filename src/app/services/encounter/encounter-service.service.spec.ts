import { TestBed } from '@angular/core/testing';

import { EncounterServiceService } from './encounter-service.service';

describe('EncounterServiceService', () => {
  let service: EncounterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncounterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
