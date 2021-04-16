import { TestBed } from '@angular/core/testing';

import { PlayerClassService } from './player-class.service';

describe('PlayerClassService', () => {
  let service: PlayerClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
