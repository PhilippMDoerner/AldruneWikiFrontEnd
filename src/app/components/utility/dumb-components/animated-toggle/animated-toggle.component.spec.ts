import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedToggleComponent } from './animated-toggle.component';

describe('AnimatedToggleComponent', () => {
  let component: AnimatedToggleComponent;
  let fixture: ComponentFixture<AnimatedToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
