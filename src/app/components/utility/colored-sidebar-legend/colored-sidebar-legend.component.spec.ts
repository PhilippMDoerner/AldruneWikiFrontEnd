import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredSidebarLegendComponent } from './colored-sidebar-legend.component';

describe('ColoredSidebarLegendComponent', () => {
  let component: ColoredSidebarLegendComponent;
  let fixture: ComponentFixture<ColoredSidebarLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColoredSidebarLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoredSidebarLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
