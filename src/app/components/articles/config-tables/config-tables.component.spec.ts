import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigTablesComponent } from './config-tables.component';

describe('ConfigTablesComponent', () => {
  let component: ConfigTablesComponent;
  let fixture: ComponentFixture<ConfigTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
