import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterArticleUpdateComponent } from './character-article-update.component';

describe('CharacterArticleUpdateComponent', () => {
  let component: CharacterArticleUpdateComponent;
  let fixture: ComponentFixture<CharacterArticleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterArticleUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterArticleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
