import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteOverviewComponent } from './quote-overview.component';

describe('QuoteOverviewComponent', () => {
  let component: QuoteOverviewComponent;
  let fixture: ComponentFixture<QuoteOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
