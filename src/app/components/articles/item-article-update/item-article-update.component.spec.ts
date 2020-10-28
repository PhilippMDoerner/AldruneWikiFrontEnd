import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemArticleUpdateComponent } from './item-article-update.component';

describe('ItemArticleUpdateComponent', () => {
  let component: ItemArticleUpdateComponent;
  let fixture: ComponentFixture<ItemArticleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemArticleUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemArticleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
