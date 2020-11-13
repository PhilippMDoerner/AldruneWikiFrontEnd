import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerMapCreateComponent } from './marker-map-create.component';

describe('MarkerMapCreateComponent', () => {
  let component: MarkerMapCreateComponent;
  let fixture: ComponentFixture<MarkerMapCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkerMapCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerMapCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
