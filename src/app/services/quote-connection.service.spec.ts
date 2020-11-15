import { TestBed } from '@angular/core/testing';

import { QuoteConnectionService } from './quote-connection.service';

describe('QuoteConnectionService', () => {
  let service: QuoteConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
