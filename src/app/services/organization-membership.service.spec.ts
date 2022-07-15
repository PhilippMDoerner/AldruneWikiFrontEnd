import { TestBed } from '@angular/core/testing';

import { OrganizationMembershipService } from './organization-membership.service';

describe('OrganizationMembershipService', () => {
  let service: OrganizationMembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationMembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
