import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryEntryEncounterListComponent } from './diary-entry-encounter-list.component';

describe('DiaryEntryEncounterListComponent', () => {
  let component: DiaryEntryEncounterListComponent;
  let fixture: ComponentFixture<DiaryEntryEncounterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryEntryEncounterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryEntryEncounterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
