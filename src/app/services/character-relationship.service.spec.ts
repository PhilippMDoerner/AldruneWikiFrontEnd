import { TestBed } from '@angular/core/testing';

import { CharacterRelationshipService } from './character-relationship.service';

describe('CharacterRelationshipService', () => {
  let service: CharacterRelationshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterRelationshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
