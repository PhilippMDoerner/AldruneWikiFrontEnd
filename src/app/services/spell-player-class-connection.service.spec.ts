import { TestBed } from '@angular/core/testing';

import { SpellPlayerClassConnectionService } from './spell-player-class-connection.service';

describe('SpellPlayerClassConnectionService', () => {
  let service: SpellPlayerClassConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpellPlayerClassConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
