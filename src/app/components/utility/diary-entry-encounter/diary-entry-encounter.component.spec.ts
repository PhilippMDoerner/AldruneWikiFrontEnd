import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryEntryEncounterComponent } from './diary-entry-encounter.component';

describe('DiaryEntryEncounterComponent', () => {
  let component: DiaryEntryEncounterComponent;
  let fixture: ComponentFixture<DiaryEntryEncounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryEntryEncounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryEncounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
