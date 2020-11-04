import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestArticleComponent } from './quest-article.component';

describe('QuestArticleComponent', () => {
  let component: QuestArticleComponent;
  let fixture: ComponentFixture<QuestArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
