import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationArticleComponent } from './location-article.component';

describe('LocationArticleComponent', () => {
  let component: LocationArticleComponent;
  let fixture: ComponentFixture<LocationArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
