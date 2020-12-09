import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyFormcontainerComponent } from './formly-formcontainer.component';

describe('FormlyFormcontainerComponent', () => {
  let component: FormlyFormcontainerComponent;
  let fixture: ComponentFixture<FormlyFormcontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormlyFormcontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlyFormcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
