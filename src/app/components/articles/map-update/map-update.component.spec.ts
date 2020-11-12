import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapUpdateComponent } from './map-update.component';

describe('MapUpdateComponent', () => {
  let component: MapUpdateComponent;
  let fixture: ComponentFixture<MapUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
