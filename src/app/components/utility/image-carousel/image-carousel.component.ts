import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants, FormState } from 'src/app/app.constants';
import { Image, ImageObject } from 'src/app/models/image';
import { ImageUploadService } from 'src/app/services/image/image-upload.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { CardFormMixin } from 'src/app/utils/functions/cardMixin';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent extends PermissionUtilityFunctionMixin {
  constants = Constants;
  FormState = FormState;
  formState: FormState = FormState.READ;

  @Input() images : Image[];
  @Input() article_type: string;
  @Input() article_pk: number;

  currentImageIndex: number = 0;

  userModel: ImageObject;
  serverModel: ImageObject;

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", required: false}),
    this.formlyService.genericInput({key: "character_article", label: "Character Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.genericInput({key: "location_article", label: "Location Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.genericInput({key: "creature_article", label: "Creature Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.genericInput({key: "organization_article", label: "Organization Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.genericInput({key: "encounter_article", label: "Encounter Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.genericInput({key: "item_article", label: "Item Article", hide: true, isNumberInput: true, required: false}),
    this.formlyService.singleFileField({key: "image"})
  ];

  constructor(
    private imageUploadService: ImageUploadService,
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(tokenService, route);
  }

  getCurrentMainImage(): ImageObject{
    return this.images[this.currentImageIndex];
  }

  onSlide(event){
    const currentImageSlideId: string = event.current;
    const currentImageIndexStr: string = currentImageSlideId.replace("imageIndex-", "");
    this.currentImageIndex = parseInt(currentImageIndexStr, 10);
  }

  resetImageModel(): void{
    this.userModel = new ImageObject();
  }

  toggleDeleteState(): void{
    this.formState = FormState.DELETE;
  }

  toggleCreateState(): void{
    this.formState = FormState.CREATE;

    this.resetImageModel();
    this.userModel.article_type = this.article_type;
    const article_type_pk_key = `${this.article_type}_article`;
    this.userModel[article_type_pk_key] = this.article_pk;
  }

  toggleEditState(): void{
    this.formState = FormState.UPDATE;

    const currentMainImage = this.images[this.currentImageIndex];
    this.userModel = currentMainImage;
  }

  onCancel(): void{
    this.formState = FormState.READ;
  }

  onSubmit(): void{
    if (this.formState === FormState.CREATE){
      this.createImage();
    } else if (this.formState === FormState.UPDATE || this.formState === FormState.UPDATEOUTDATED){
      this.updateImage();
    } else {
      throw `Submitted form while Image-Gallery Component was in invalid state ${this.formState}`;
    }
  }

  updateImage(): void{
    const isUpdateWithImageChange: boolean = this.userModel.image.constructor.name.toLowerCase() !== "string";

    let updateObservable: Observable<ImageObject>;
    if(isUpdateWithImageChange){
      updateObservable = this.imageUploadService.update(this.userModel.pk, this.userModel);

    } else {
      const minimizedUserModel = {pk: this.userModel.pk, name: this.userModel.name} as ImageObject;
      updateObservable= this.imageUploadService.patch(this.userModel.pk, minimizedUserModel);
    }

    updateObservable
      .pipe(first())
      .subscribe(
        (updatedImage: ImageObject) => {
          updatedImage.image = updatedImage.image.replace(Constants.wikiUrl, ""); //Backend somehow returns ImageObject where ImageObject.image includes the wikiUrl, which it shouldn't
          this.images[this.currentImageIndex] = updatedImage;
          this.resetImageModel();
  
          this.formState = FormState.READ;
        }, 
        error => this.warnings.showWarning(error)
      );
  }

  createImage(): void{
    this.imageUploadService.create(this.userModel).pipe(first()).subscribe(
      (createdImage: ImageObject) => {
        this.images.push(createdImage);
        this.resetImageModel();

        this.formState = FormState.READ;
      }, 
      error => this.warnings.showWarning(error)
    );  
  }


  deleteCurrentMainImage(): void{
    const currentMainImage = this.getCurrentMainImage();

    this.imageUploadService.delete(currentMainImage.pk).pipe(first()).subscribe(
      response => {
        this.images.splice(this.currentImageIndex, 1);
        if (this.currentImageIndex === this.images.length){
          this.currentImageIndex = this.images.length - 1;
        }

        this.formState = FormState.READ;
      },
      error => this.warnings.showWarning(error)
    )
  }
}
