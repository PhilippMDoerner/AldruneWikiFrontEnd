import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionUpdateModalComponent } from './session-update-modal.component';

describe('SessionUpdateModalComponent', () => {
  let component: SessionUpdateModalComponent;
  let fixture: ComponentFixture<SessionUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionUpdateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
