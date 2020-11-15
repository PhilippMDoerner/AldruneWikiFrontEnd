import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteGalleryComponent } from './quote-gallery.component';

describe('QuoteGalleryComponent', () => {
  let component: QuoteGalleryComponent;
  let fixture: ComponentFixture<QuoteGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
