import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyUpdatedArticleComponent } from './recently-updated-article.component';

describe('RecentlyUpdatedArticleComponent', () => {
  let component: RecentlyUpdatedArticleComponent;
  let fixture: ComponentFixture<RecentlyUpdatedArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyUpdatedArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyUpdatedArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
