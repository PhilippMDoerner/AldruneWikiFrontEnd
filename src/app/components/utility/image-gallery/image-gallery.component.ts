import { Component, OnInit, Input, HostListener, Output } from '@angular/core';
import { Image, EmptyImage } from "src/app/models/image";
import { Constants } from "src/app/app.constants";
import { deepCopy } from "src/app/utils";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ImageUploadService } from "src/app/services/image/image-upload.service";
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

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
  activeModalState: string;

  model: Image;
  form: FormGroup = new FormGroup({});
  formImageName: string;
  formImageFile: File = null;
  imageFileForUpload: File = null;

  private imageSubscription: Subscription;

  fields: FormlyFieldConfig[] = [
    {
      key: "article_type",
      type: "input",
      templateOptions: {
        label: "Article Type",
        type: "text"
      },
      hideExpression: true,
      expressionProperties:{
        "templateOptions.disabled": 'true'
      }
    },
    {
      key: "name",
      type: "input",
      templateOptions: {
        label: "Name",
        type: "text"
      },
    },
    {
      key: "character_article",
      type: "input",
      templateOptions: {
        type: "number",
        label: "Character Article Pk",
      },
      hideExpression: true,
      expressionProperties:{
        "templateOptions.disabled": 'true'
      }
    },
    {
      key: "location_article",
      type: "input",
      templateOptions: {
        type: "number",
        label: "Location Article Pk",
      },
      hideExpression: true,
      expressionProperties:{
        "templateOptions.disabled": 'true'
      }
    },
    {
      key: "creature_article",
      type: "input",
      templateOptions: {
        type: "number",
        label: "Creature Article Pk",
      },
      hideExpression: true,
      expressionProperties:{
        "templateOptions.disabled": 'true'
      }
    },
    {
      key: "organization_article",
      type: "input",
      templateOptions: {
        type: "number",
        label: "Organization Article Pk",
      },
      hideExpression: true,
      expressionProperties:{
        "templateOptions.disabled": 'true'
      }
    },
    {
      key: "encounter_article",
      type: "input",
      templateOptions: {
        type: "number",
        label: "Encounter Article Pk",
      },
      hideExpression: true,
      expressionProperties:{
        "templateOptions.disabled": 'true'
      }
    },
    {
      key: "item_article",
      type: "input",
      templateOptions: {
        type: "number",
        label: "Item Article Pk",
      },
      hideExpression: true,
      expressionProperties:{
        "templateOptions.disabled": 'true'
      }
    },
  ]



  constructor(private modalService: NgbModal, private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {}

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


  // Update Image
  showUpdateModal(content){
    this.activeModalState = this.constants.updateState;
    this.model = deepCopy(this.images[this.visibleImageIndex]);
    this.modalService.open(content).result.then( 
      (closeSignal) => {this.updateImage()},(dismissSignal) => {}
    );
  }

  updateImage(){
    console.log("Send Image update to server....");
    this.formImageName = null;
  }

  // Create Image
  showCreateModal(content){
    this.activeModalState = this.constants.createState;
    this.model = new EmptyImage();
    this.model.article_type = this.article_type;
    const article_type_pk_key = `${this.article_type}_article`;
    this.model[article_type_pk_key] = this.article_pk;

    this.modalService.open(content).result.then( 
      (closeSignal) => {this.createImage()},(dismissSignal) => {}
    );
  }

  createImage(){
    this.imageUploadService.postImage(this.model, this.formImageFile).subscribe( data => {
      console.log("Image sent!");
      this.images.push(this.model);
      this.model = new EmptyImage();
    }, error => {
      console.log("ERROR");
      console.log(error);
    })  
  }

  onFileSelected(event) {
    console.log("I fired on change");
    this.formImageFile = event.target.files[0];
  }

  // Delete Image
  showDeleteModal(content){
    if (this.isLastImage()) return;
    
    this.activeModalState = this.constants.deleteState;
    this.modalService.open(content).result.then( 
      (closeSignal) => {this.deleteCurrentMainImage()},(dismissSignal) => {}
    );  
  }

  deleteCurrentMainImage(){
    const currentMainImage = this.getCurrentMainImage();

    this.imageUploadService.deleteImage(currentMainImage.pk).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
    
    this.images.splice(this.visibleImageIndex, 1);
    if (this.visibleImageIndex === this.images.length){
      this.visibleImageIndex = this.images.length - 1;
    }
  }

  isLastImage(){
    if(this.images){
      return this.images.length === 1;
    }

    return true;
  }

  ngOnDestroy(){
    this.imageSubscription.unsubscribe();
  }
}
