import { TestBed } from '@angular/core/testing';

import { SessionAudioTimestampService } from './session-audio-timestamp.service';

describe('SessionAudioTimestampService', () => {
  let service: SessionAudioTimestampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionAudioTimestampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
