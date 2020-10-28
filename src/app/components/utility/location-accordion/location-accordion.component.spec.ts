import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAccordionComponent } from './location-accordion.component';

describe('LocationAccordionComponent', () => {
  let component: LocationAccordionComponent;
  let fixture: ComponentFixture<LocationAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
