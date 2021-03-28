import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { Image, ImageObject } from "src/app/models/image";
import { Constants } from "src/app/app.constants";
import { ImageUploadService } from "src/app/services/image/image-upload.service";
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first, throwIfEmpty } from 'rxjs/operators';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})

export class ImageGalleryComponent extends PermissionUtilityFunctionMixin{
  constants: any = Constants;

  @Input() images : Image[];
  @Input() article_type: string;
  @Input() article_pk: number;
  visibleImageIndex: number = 0;
  componentState: string = Constants.displayState;
  slideRight: String = "right";
  slideLeft: String = "left";
  imageSlideDirection: String;

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
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
    ) { super() }

  @HostListener('document:keyup', ['$event'])
  changeMainImage(event): void{
    if(event.code === "ArrowRight"){
      this.showNextImage();
    } else if (event.code === "ArrowLeft"){
      this.showPriorImage();
    }
  }

  showNextImage(): void{
    this.incrementVisibleImageIndex();
    this.imageSlideDirection = this.slideLeft;
  }

  showPriorImage(): void{
    this.decreaseVisibleImageIndex();
    this.imageSlideDirection = this.slideRight;
  }

  // Main Image Gallery controls
  incrementVisibleImageIndex(): void{
    let hasMaxImageIndex : boolean = this.visibleImageIndex === this.images.length - 1;
    this.visibleImageIndex = hasMaxImageIndex ? 0 : this.visibleImageIndex + 1;
  }

  decreaseVisibleImageIndex(): void{
    let hasMinImageIndex : boolean = this.visibleImageIndex === 0;
    this.visibleImageIndex = hasMinImageIndex ? this.images.length - 1 : this.visibleImageIndex - 1;
  }

  setMainImage(nextMainImage: Image): void{
    if (!this.images.includes(nextMainImage)){
      throw("The image you want to set is not part of the gallery (images[]) !")
    }
    this.visibleImageIndex = this.images.indexOf(nextMainImage);
  }

  getCurrentMainImage(): ImageObject{
    return this.images[this.visibleImageIndex];
  }

  resetImageModel(): void{
    this.model = new ImageObject();
  }

  enableDisplayState(): void{
    this.componentState = Constants.displayState;
  }

  hasImages(): boolean{
    return this.images.length >= 1;
  }

  onSubmit(): void{
    if (this.componentState === this.constants.createState){
      this.createImage();
    } else if (this.componentState === this.constants.updateState){
      this.updateImage();
    } else {
      throw `Submitted form while Image-Gallery Component was in invalid state ${this.componentState}`;
    }
  }

  onCancel(): void{
    this.enableDisplayState();
  }

  // Update Image
  enableUpdateState(): void{
    this.componentState = this.constants.updateState;
    const currentMainImage = this.images[this.visibleImageIndex];
    this.model = currentMainImage;
  }

  updateImage(): void{
    this.imageUploadService.updateImage(this.model).pipe(first()).subscribe(
      (updatedImage: ImageObject) => {
        updatedImage.image = updatedImage.image.replace(Constants.wikiUrl, ""); //Backend somehow returns ImageObject where ImageObject.image includes the wikiUrl, which it shouldn't
        this.images[this.visibleImageIndex] = updatedImage;
        this.resetImageModel();

        this.enableDisplayState();
      }, 
      error => this.warnings.showWarning(error)
    );
  }

  // Create Image
  enableCreateState(): void{
    this.componentState = this.constants.createState;

    this.resetImageModel();
    this.model.article_type = this.article_type;
    const article_type_pk_key = `${this.article_type}_article`;
    this.model[article_type_pk_key] = this.article_pk;
  }

  createImage(): void{
    this.imageUploadService.postImage(this.model).pipe(first()).subscribe(
      (createdImage: ImageObject) => {
        this.images.push(createdImage);
        this.resetImageModel();

        this.enableDisplayState();
      }, 
      error => this.warnings.showWarning(error)
    );  
  }

  // Delete Image
  enableDeleteState(): void{
    if (this.isLastImage()) return;
    this.componentState = this.constants.deleteState;
  }

  deleteCurrentMainImage(): void{
    const currentMainImage = this.getCurrentMainImage();

    this.imageUploadService.deleteImage(currentMainImage.pk).pipe(first()).subscribe(
      response => {
        this.images.splice(this.visibleImageIndex, 1);
        if (this.visibleImageIndex === this.images.length){
          this.visibleImageIndex = this.images.length - 1;
        }

        this.enableDisplayState();
      },
      error => this.warnings.showWarning(error)
    )
  }

  isLastImage(){
    if(this.images) return this.images.length <= 1;
    else return true;
  }
}
