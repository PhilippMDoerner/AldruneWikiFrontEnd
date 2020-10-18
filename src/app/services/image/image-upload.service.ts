import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Image } from "src/app/models/image";
import { Constants } from "src/app/app.constants";

const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  api_url_base: string = `${Constants.wikiApiURL}/image`;

  constructor(private http: HttpClient) { }
  imageData: Observable<any>;

  getArticleImages(articleType: string, pk: number): Observable<Image[]>{
    const url = `${this.api_url_base}/${articleType}/${pk}`;
    console.log(url);
    return this.http.get<Image[]>(url);
  }

  updateImage(image: Image){
    const url = `${this.api_url_base}/pk/${image.pk}`;
    return this.http.put<Image>(url, image, httpOptions);
  }

  postImage(image: Image){
    const url = `${this.api_url_base}/`;
    return this.http.post<Image>(url, image, httpOptions);
  }

  deleteImage(image: Image){
    const url = `${this.api_url_base}/pk/${image.pk}`;
    return this.http.delete<Image>(url, httpOptions);
  }

}
