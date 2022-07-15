import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineCreateButtonComponent } from './inline-create-button.component';

describe('InlineCreateButtonComponent', () => {
  let component: InlineCreateButtonComponent;
  let fixture: ComponentFixture<InlineCreateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineCreateButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
