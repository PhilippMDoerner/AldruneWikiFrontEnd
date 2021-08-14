import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyUpdatedArticlesListComponent } from './recently-updated-articles-list.component';

describe('RecentlyUpdatedArticlesListComponent', () => {
  let component: RecentlyUpdatedArticlesListComponent;
  let fixture: ComponentFixture<RecentlyUpdatedArticlesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentlyUpdatedArticlesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyUpdatedArticlesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
