import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationArticleComponent } from './organization-article.component';

describe('OrganizationArticleComponent', () => {
  let component: OrganizationArticleComponent;
  let fixture: ComponentFixture<OrganizationArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
