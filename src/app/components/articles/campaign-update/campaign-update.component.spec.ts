import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignUpdateComponent } from './campaign-update.component';

describe('CampaignUpdateComponent', () => {
  let component: CampaignUpdateComponent;
  let fixture: ComponentFixture<CampaignUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
