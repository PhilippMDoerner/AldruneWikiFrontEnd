import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimestampListComponent } from './timestamp-list.component';

describe('TimestampListComponent', () => {
  let component: TimestampListComponent;
  let fixture: ComponentFixture<TimestampListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimestampListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimestampListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
