import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionUpdateWrapperComponent } from './session-update-wrapper.component';

describe('SessionUpdateWrapperComponent', () => {
  let component: SessionUpdateWrapperComponent;
  let fixture: ComponentFixture<SessionUpdateWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionUpdateWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionUpdateWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
