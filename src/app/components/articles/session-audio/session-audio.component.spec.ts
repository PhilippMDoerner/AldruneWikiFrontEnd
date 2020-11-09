import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAudioComponent } from './session-audio.component';

describe('SessionAudioComponent', () => {
  let component: SessionAudioComponent;
  let fixture: ComponentFixture<SessionAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
