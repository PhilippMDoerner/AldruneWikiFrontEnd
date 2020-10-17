import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { Image, EmptyImage } from "src/app/models/image";
import { Constants } from "src/app/app.constants";
import { deepCopy } from "src/app/utils";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})

export class ImageGalleryComponent implements OnInit {
  constants: any = Constants;
  @Input() images : Image[];
  visibleImageIndex: number = 0;
  formImageData: Image;
  activeModalState: string;
  articleUrl: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.articleUrl = this.images[0].articleUrl;
  }

  @HostListener('document:keyup', ['$event'])
  changeMainImage(event){
    if(event.code === "ArrowRight"){
      this.incrementVisibleImageIndex();
    } else if (event.code === "ArrowLeft"){
      this.decreaseVisibleImageIndex();
    }
  }

  incrementVisibleImageIndex(){
    let hasMaxImageIndex : boolean = this.visibleImageIndex === this.images.length - 1;
    this.visibleImageIndex = hasMaxImageIndex ? 0 : this.visibleImageIndex + 1;
  }

  decreaseVisibleImageIndex(){
    let hasMinImageIndex : boolean = this.visibleImageIndex === 0;
    this.visibleImageIndex = hasMinImageIndex ? this.images.length - 1 : this.visibleImageIndex - 1;
  }

  setMainImage(nextMainImage: Image){
    if (!this.images.includes(nextMainImage)){
      throw("The image you want to set is not part of the gallery (images[]) !")
    }
    this.visibleImageIndex = this.images.indexOf(nextMainImage);
  }

  deleteImage(){
    console.log(`Send delete request to server...`);
    this.images.splice(this.visibleImageIndex, 1);
    if (this.visibleImageIndex === this.images.length){
      this.visibleImageIndex = this.images.length - 1;
    }
  }

  updateImage(){
    console.log("Send Image update to server....");
    this.images[this.visibleImageIndex] = this.formImageData;
    this.formImageData = null;
  }

  createImage(){
    console.log("Send Image creation to server...");
    //Do the below in a promise-callback when you receive the response from the server once services are implemented
    this.images.push(this.formImageData);
    this.setMainImage(this.formImageData);
    console.log(this.formImageData);
    this.formImageData = null;
  }

  showUpdateModal(content){
    this.activeModalState = this.constants.updateState;
    this.formImageData = deepCopy(this.images[this.visibleImageIndex]);
    this.modalService.open(content).result.then( 
      (closeSignal) => {this.updateImage()},(dismissSignal) => {}
    );
  }

  showCreateModal(content){
    this.activeModalState = this.constants.createState;
    this.formImageData = new EmptyImage();
    this.formImageData.articleUrl = this.articleUrl;
    this.modalService.open(content).result.then( 
      (closeSignal) => {this.createImage()},(dismissSignal) => {}
    );
  }

  showDeleteModal(content){
    if (this.images.length === 1) return;
    
    this.activeModalState = this.constants.deleteState;
    this.modalService.open(content).result.then( 
      (closeSignal) => {this.deleteImage()},(dismissSignal) => {}
    );  
  }
}
