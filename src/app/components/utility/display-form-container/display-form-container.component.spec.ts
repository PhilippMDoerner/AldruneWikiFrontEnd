import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFormContainerComponent } from './display-form-container.component';

describe('DisplayFormContainerComponent', () => {
  let component: DisplayFormContainerComponent;
  let fixture: ComponentFixture<DisplayFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
