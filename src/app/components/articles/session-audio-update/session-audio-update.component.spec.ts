import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAudioUpdateComponent } from './session-audio-update.component';

describe('SessionAudioUpdateComponent', () => {
  let component: SessionAudioUpdateComponent;
  let fixture: ComponentFixture<SessionAudioUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionAudioUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAudioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
