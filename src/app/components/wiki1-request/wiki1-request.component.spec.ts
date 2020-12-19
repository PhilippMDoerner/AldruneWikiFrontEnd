import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wiki1RequestComponent } from './wiki1-request.component';

describe('Wiki1RequestComponent', () => {
  let component: Wiki1RequestComponent;
  let fixture: ComponentFixture<Wiki1RequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Wiki1RequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Wiki1RequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
