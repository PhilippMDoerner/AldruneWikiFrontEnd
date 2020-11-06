import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteToggleComponent } from './delete-toggle.component';

describe('DeleteToggleComponent', () => {
  let component: DeleteToggleComponent;
  let fixture: ComponentFixture<DeleteToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
