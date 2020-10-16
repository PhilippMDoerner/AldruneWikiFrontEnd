import { TestBed } from '@angular/core/testing';

import { CreatureService } from './creature.service';

describe('CreatureService', () => {
  let service: CreatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
