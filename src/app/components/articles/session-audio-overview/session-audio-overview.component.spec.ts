import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAudioOverviewComponent } from './session-audio-overview.component';

describe('SessionAudioOverviewComponent', () => {
  let component: SessionAudioOverviewComponent;
  let fixture: ComponentFixture<SessionAudioOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionAudioOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionAudioOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
