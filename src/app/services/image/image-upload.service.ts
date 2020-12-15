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

  updateImage(imageModel: Image){
    const formData: FormData = convertSingleFileModelToFormData(imageModel, "image");
    const url = `${this.imageUrl}/pk/${imageModel.pk}/`;
    return this.http.put<Image>(url, formData);
  }

  postImage(imageModel: Image): Observable<Image>{
    const url = `${Constants.wikiApiUrl}/image/upload/`;
    const formData: FormData = convertSingleFileModelToFormData(imageModel, "image");
    return this.http.post<Image>(url, formData);
  }

  deleteImage(image_pk: number){
    const url = `${this.imageUrl}/pk/${image_pk}`;
    return this.http.delete<Image>(url);
  }

}
