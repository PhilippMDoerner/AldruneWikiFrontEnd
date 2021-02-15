import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotefieldComponent } from './quotefield.component';

describe('QuotefieldComponent', () => {
  let component: QuotefieldComponent;
  let fixture: ComponentFixture<QuotefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotefieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
