import { TestBed } from '@angular/core/testing';

import { CharacterPlayerClassConnectionService } from './character-player-class-connection.service';

describe('CharacterPlayerClassConnectionService', () => {
  let service: CharacterPlayerClassConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterPlayerClassConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
