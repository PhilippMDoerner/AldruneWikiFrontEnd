import { TestBed } from '@angular/core/testing';

import { GenericObjectService } from './generic-object.service';

describe('GenericObjectService', () => {
  let service: GenericObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
