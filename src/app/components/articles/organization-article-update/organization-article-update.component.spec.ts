import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationArticleUpdateComponent } from './organization-article-update.component';

describe('OrganizationArticleUpdateComponent', () => {
  let component: OrganizationArticleUpdateComponent;
  let fixture: ComponentFixture<OrganizationArticleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationArticleUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationArticleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
