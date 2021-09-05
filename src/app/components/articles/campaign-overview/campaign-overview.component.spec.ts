import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignOverviewComponent } from './campaign-overview.component';

describe('CampaignOverviewComponent', () => {
  let component: CampaignOverviewComponent;
  let fixture: ComponentFixture<CampaignOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
