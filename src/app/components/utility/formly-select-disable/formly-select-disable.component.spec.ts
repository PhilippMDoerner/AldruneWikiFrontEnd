import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlySelectDisableComponent } from './formly-select-disable.component';

describe('FormlySelectDisableComponent', () => {
  let component: FormlySelectDisableComponent;
  let fixture: ComponentFixture<FormlySelectDisableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlySelectDisableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlySelectDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
