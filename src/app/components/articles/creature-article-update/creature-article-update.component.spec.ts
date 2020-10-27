import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureArticleUpdateComponent } from './creature-article-update.component';

describe('CreatureArticleUpdateComponent', () => {
  let component: CreatureArticleUpdateComponent;
  let fixture: ComponentFixture<CreatureArticleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatureArticleUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatureArticleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
