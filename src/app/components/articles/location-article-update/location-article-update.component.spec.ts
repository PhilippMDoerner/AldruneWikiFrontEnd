import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationArticleUpdateComponent } from './location-article-update.component';

describe('LocationArticleUpdateComponent', () => {
  let component: LocationArticleUpdateComponent;
  let fixture: ComponentFixture<LocationArticleUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationArticleUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationArticleUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
