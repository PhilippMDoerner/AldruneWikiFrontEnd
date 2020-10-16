import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  @Input() image_urls : string[];
  visibleImageIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:keyup', ['$event'])
  changeVisibleImageIndex(event){
    if(event.code === "ArrowRight"){
      this.incrementVisibleImageIndex();
    } else if (event.code === "ArrowLeft"){
      this.decreaseVisibleImageIndex();
    }
  }

  incrementVisibleImageIndex(){
    let hasMaxImageIndex : boolean = this.visibleImageIndex === this.image_urls.length - 1;
    this.visibleImageIndex = hasMaxImageIndex ? 0 : this.visibleImageIndex + 1;
  }

  decreaseVisibleImageIndex(){
    let hasMinImageIndex : boolean = this.visibleImageIndex === 0;
    this.visibleImageIndex = hasMinImageIndex ? this.image_urls.length - 1 : this.visibleImageIndex - 1;
  }

  changeImageIndex(event){
    console.log(event);
  }

}
