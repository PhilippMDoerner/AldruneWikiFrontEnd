import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryentryArticleUpdateComponent } from './diaryentry-article-update.component';

describe('DiaryentryArticleUpdateComponent', () => {
  let component: DiaryentryArticleUpdateComponent;
  let fixture: ComponentFixture<DiaryentryArticleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryentryArticleUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryentryArticleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
