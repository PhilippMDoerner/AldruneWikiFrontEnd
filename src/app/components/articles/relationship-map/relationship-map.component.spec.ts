import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipMapComponent } from './relationship-map.component';

describe('RelationshipMapComponent', () => {
  let component: RelationshipMapComponent;
  let fixture: ComponentFixture<RelationshipMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationshipMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
