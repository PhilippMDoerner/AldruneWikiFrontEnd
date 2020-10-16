import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemArticleComponent } from './item-article.component';

describe('ItemArticleComponent', () => {
  let component: ItemArticleComponent;
  let fixture: ComponentFixture<ItemArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
