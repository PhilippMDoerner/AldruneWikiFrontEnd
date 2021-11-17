import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Image } from "src/app/models/image";
import { Constants } from "src/app/app.constants";
import { convertModelToFormData, convertSingleFileModelToFormData } from "src/app/utils/formDataConverter";
import { GenericService } from '../generic.service';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService extends GenericService {
  baseUrl: string = `${Constants.wikiApiUrl}/image`;

  constructor(http: HttpClient) {
    super(http)
  }

  getArticleImages(articleType: string, pk: number): Observable<Image[]>{
    const url = `${this.baseUrl}/${articleType}/${pk}`;
    return this.http.get<Image[]>(url);
  }

  update(imagePk: number, imageModel: Image){
    const formData: FormData = convertSingleFileModelToFormData(imageModel, "image");
    const url = `${this.baseUrl}/pk/${imagePk}/`;
    return this.http.put<Image>(url, formData);
  }

  create(imageModel: Image): Observable<Image>{
    const url = `${Constants.wikiApiUrl}/image/upload/`;
    const formData: FormData = convertSingleFileModelToFormData(imageModel, "image");
    return this.http.post<Image>(url, formData);
  }

  patch(imagePk: number, imageModel: Image): Observable<Image>{
    const url = `${this.baseUrl}/pk/${imagePk}/`;

    const formData: FormData = convertModelToFormData(imageModel);
    return this.http.patch<Image>(url, formData);
  }

  delete(image_pk: number){
    const url = `${this.baseUrl}/pk/${image_pk}`;
    return this.http.delete<Image>(url);
  }

}
