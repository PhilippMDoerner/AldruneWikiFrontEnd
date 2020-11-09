import { TestBed } from '@angular/core/testing';

import { SessionAudioService } from './session-audio.service';

describe('SessionAudioService', () => {
  let service: SessionAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
