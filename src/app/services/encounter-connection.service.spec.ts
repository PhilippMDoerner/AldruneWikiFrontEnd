import { TestBed } from '@angular/core/testing';

import { EncounterConnectionService } from './encounter-connection.service';

describe('EncounterConnectionService', () => {
  let service: EncounterConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncounterConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
