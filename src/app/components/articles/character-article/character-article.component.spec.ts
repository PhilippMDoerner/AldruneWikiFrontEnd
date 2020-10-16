import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterArticleComponent } from './character-article.component';

describe('CharacterArticleComponent', () => {
  let component: CharacterArticleComponent;
  let fixture: ComponentFixture<CharacterArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
