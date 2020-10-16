import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureArticleComponent } from './creature-article.component';

describe('CreatureArticleComponent', () => {
  let component: CreatureArticleComponent;
  let fixture: ComponentFixture<CreatureArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatureArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatureArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
