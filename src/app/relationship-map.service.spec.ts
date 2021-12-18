import { TestBed } from '@angular/core/testing';

import { RelationshipMapService } from './relationship-map.service';

describe('RelationshipMapService', () => {
  let service: RelationshipMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelationshipMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
