import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { Image, EmptyImage } from "src/app/models/image";
import { Constants } from "src/app/app.constants";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ImageUploadService } from "src/app/services/image/image-upload.service";
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MyFormlyService } from 'src/app/services/my-formly.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})

export class ImageGalleryComponent implements OnInit {
  constants: any = Constants;

  @Input() images : Image[];
  @Input() article_type: string;
  @Input() article_pk: number;
  visibleImageIndex: number = 0;
  activeModalState: string = null;

  model: Image;
  form: FormGroup = new FormGroup({});
  formImageName: string;
  formImageFile: File = null;

  private imageSubscription: Subscription;

  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", required: false}),
    this.formlyService.genericInput({key: "character_article", label: "Character Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.genericInput({key: "location_article", label: "Location Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.genericInput({key: "creature_article", label: "Creature Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.genericInput({key: "organization_article", label: "Organization Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.genericInput({key: "encounter_article", label: "Encounter Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.genericInput({key: "item_article", label: "Item Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.singleFileField({key: "image"})
  ]

  constructor(
    private modalService: NgbModal,
    private imageUploadService: ImageUploadService,
    private formlyService: MyFormlyService
    ) { }

  ngOnInit(): void {}

  @HostListener('document:keyup', ['$event'])
  changeMainImage(event){
    if(event.code === "ArrowRight"){
      this.incrementVisibleImageIndex();
    } else if (event.code === "ArrowLeft"){
      this.decreaseVisibleImageIndex();
    }
    console.log(typeof this.getCurrentMainImage().image);
  }

  // Main Image Gallery controls
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

  getCurrentMainImage(){
    return this.images[this.visibleImageIndex];
  }

  resetImageModel(){
    this.model = new EmptyImage();
  }


  // Update Image
  // showUpdateModal(content){
  //   this.activeModalState = this.constants.updateState;
  //   this.model = deepCopy(this.images[this.visibleImageIndex]);
  //   this.modalService.open(content).result.then( 
  //     (closeSignal) => {this.updateImage()},
  //     (dismissSignal) => {}
  //   );
  // }

  // updateImage(){
  //   this.imageUploadService.updateImage(this.model).subscribe(updatedImage => {
  //     console.log(updatedImage);
  //     this.images[this.visibleImageIndex] = updatedImage;
  //     this.resetImageModel();
  //   }, error => console.log(error));
  // }

  // Create Image
  showCreateModal(content){
    this.activeModalState = this.constants.createState;
    this.resetImageModel();

    this.model.article_type = this.article_type;
    const article_type_pk_key = `${this.article_type}_article`;
    this.model[article_type_pk_key] = this.article_pk;

    this.modalService.open(content).result.then( 
      (closeSignal) => this.createImage(),
      (dismissSignal) => {}
    );
  }

  createImage(){
    this.imageUploadService.postImage(this.model).subscribe(createdImage => {
      this.images.push(createdImage);
      this.resetImageModel();
    }, error => console.log(error));  
  }

  // Delete Image
  showDeleteModal(content){
    if (this.isLastImage()) return;
    
    this.activeModalState = this.constants.deleteState;
    this.modalService.open(content).result.then( 
      (closeSignal) => this.deleteCurrentMainImage(),
      (dismissSignal) => {}
    );  
  }

  deleteCurrentMainImage(){
    const currentMainImage = this.getCurrentMainImage();

    this.imageUploadService.deleteImage(currentMainImage.pk).subscribe(response => {
      this.images.splice(this.visibleImageIndex, 1);
      if (this.visibleImageIndex === this.images.length){
        this.visibleImageIndex = this.images.length - 1;
      }
    }, error => console.log(error))
  }

  isLastImage(){
    if(this.images) return this.images.length === 1;
    else return true;
  }

  ngOnDestroy(){
    if (this.imageSubscription) this.imageSubscription.unsubscribe();
  }
}
