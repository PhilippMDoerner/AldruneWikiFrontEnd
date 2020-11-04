import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestArticleUpdateComponent } from './quest-article-update.component';

describe('QuestArticleUpdateComponent', () => {
  let component: QuestArticleUpdateComponent;
  let fixture: ComponentFixture<QuestArticleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestArticleUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestArticleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
