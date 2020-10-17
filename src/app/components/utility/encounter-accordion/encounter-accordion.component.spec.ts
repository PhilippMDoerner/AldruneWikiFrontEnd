import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncounterAccordionComponent } from './encounter-accordion.component';

describe('EncounterAccordionComponent', () => {
  let component: EncounterAccordionComponent;
  let fixture: ComponentFixture<EncounterAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncounterAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncounterAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
