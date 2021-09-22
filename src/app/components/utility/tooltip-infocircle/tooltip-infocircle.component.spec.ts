import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipInfocircleComponent } from './tooltip-infocircle.component';

describe('TooltipInfocircleComponent', () => {
  let component: TooltipInfocircleComponent;
  let fixture: ComponentFixture<TooltipInfocircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TooltipInfocircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipInfocircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
