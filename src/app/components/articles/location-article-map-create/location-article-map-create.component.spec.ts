import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationArticleMapCreateComponent } from './location-article-map-create.component';

describe('LocationArticleMapCreateComponent', () => {
  let component: LocationArticleMapCreateComponent;
  let fixture: ComponentFixture<LocationArticleMapCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationArticleMapCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationArticleMapCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
