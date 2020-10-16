import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryentryArticleComponent } from './diaryentry-article.component';

describe('DiaryentryArticleComponent', () => {
  let component: DiaryentryArticleComponent;
  let fixture: ComponentFixture<DiaryentryArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryentryArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryentryArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
