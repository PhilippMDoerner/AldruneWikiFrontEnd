import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { Image, ImageObject } from "src/app/models/image";
import { Constants } from "src/app/app.constants";
import { ImageUploadService } from "src/app/services/image/image-upload.service";
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})

export class ImageGalleryComponent {
  constants: any = Constants;

  @Input() images : Image[];
  @Input() article_type: string;
  @Input() article_pk: number;
  visibleImageIndex: number = 0;
  componentState: string = Constants.displayState;

  model: Image;
  form: FormGroup = new FormGroup({});
  formImageName: string;
  formImageFile: File = null;

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
    private imageUploadService: ImageUploadService,
    private formlyService: MyFormlyService
    ) { }

  @HostListener('document:keyup', ['$event'])
  changeMainImage(event){
    if(event.code === "ArrowRight"){
      this.incrementVisibleImageIndex();
    } else if (event.code === "ArrowLeft"){
      this.decreaseVisibleImageIndex();
    }
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
    this.model = new ImageObject();
  }

  enableDisplayState(){
    this.componentState = Constants.displayState;
  }

  onSubmit(){
    if (this.componentState === this.constants.createState){
      this.createImage();
    } else if (this.componentState === this.constants.updateState){
      this.updateImage();
    } else {
      throw `Submitted form while Image-Gallery Component was in invalid state ${this.componentState}`;
    }
  }

  onCancel(){
    this.enableDisplayState();
  }

  // Update Image
  enableUpdateState(){
    this.componentState = this.constants.updateState;
    const currentMainImage = this.images[this.visibleImageIndex];
    this.model = currentMainImage;
  }

  // TODO: Fix the bug that the image isn't displayed after the update goes through
  updateImage(){
    this.imageUploadService.updateImage(this.model).pipe(first()).subscribe((updatedImage: ImageObject) => {
      this.images[this.visibleImageIndex] = updatedImage;
      this.resetImageModel();

      this.enableDisplayState();
    }, error => console.log(error));
  }

  // Create Image
  enableCreateState(){
    this.componentState = this.constants.createState;

    this.resetImageModel();
    this.model.article_type = this.article_type;
    const article_type_pk_key = `${this.article_type}_article`;
    this.model[article_type_pk_key] = this.article_pk;
  }

  createImage(){
    this.imageUploadService.postImage(this.model).pipe(first()).subscribe(createdImage => {
      this.images.push(createdImage);
      this.resetImageModel();

      this.enableDisplayState();
    }, error => console.log(error));  
  }

  // Delete Image
  enableDeleteState(){
    if (this.isLastImage()) return;
    this.componentState = this.constants.deleteState;
  }

  deleteCurrentMainImage(){
    const currentMainImage = this.getCurrentMainImage();

    this.imageUploadService.deleteImage(currentMainImage.pk).pipe(first()).subscribe(response => {
      this.images.splice(this.visibleImageIndex, 1);
      if (this.visibleImageIndex === this.images.length){
        this.visibleImageIndex = this.images.length - 1;
      }

      this.enableDisplayState();
    }, error => console.log(error))
  }

  isLastImage(){
    if(this.images) return this.images.length === 1;
    else return true;
  }
}
