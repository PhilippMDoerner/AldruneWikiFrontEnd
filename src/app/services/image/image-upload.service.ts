import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Image } from "src/app/models/image";
import { Constants } from "src/app/app.constants";
import { convertSingleFileModelToFormData } from "src/app/utils/formDataConverter";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};
//TODO: Creating works, but adding to the images list afterwards does not work properly. 
//TODO: Updating does not work
@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  imageUrl: string = `${Constants.wikiApiUrl}/image`;

  constructor(private http: HttpClient) { }
  imageData: Observable<any>;

  getArticleImages(articleType: string, pk: number): Observable<Image[]>{
    const url = `${this.imageUrl}/${articleType}/${pk}`;
    console.log(url);
    return this.http.get<Image[]>(url);
  }

  // updateImage(image: Image){
  //   const formData: FormData = new FormData();
  //   for ( var key in image ) {
  //     formData.append(key, image[key]);
  //   }
  //   const url = `${this.imageUrl}/pk/${image.pk}/`;
  //   const options = {headers: new HttpHeaders({"Content-Disposition": `attachment;`})}
  //   return this.http.put<Image>(url, image);
  // }

  postImage(imageModel: Image): Observable<Image>{
    const url = `${Constants.wikiApiUrl}/image/upload/`;
    const formData: FormData = convertSingleFileModelToFormData(imageModel, "image");
    // const formData: FormData = new FormData();
    // for ( var key in imageModel ) {
    //   if (key === "image"){
    //     formData.append(key, imageFile);
    //   } else if (imageModel[key]){
    //     formData.append(key, imageModel[key]);
    //   }
    // }
    return this.http.post<Image>(url, formData);
  }

  deleteImage(image_pk: number){
    const url = `${this.imageUrl}/pk/${image_pk}`;
    return this.http.delete<Image>(url);
  }

}
