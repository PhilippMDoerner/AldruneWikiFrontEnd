import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareFormContainerComponent } from './compare-form-container.component';

describe('CompareFormContainerComponent', () => {
  let component: CompareFormContainerComponent;
  let fixture: ComponentFixture<CompareFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareFormContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
