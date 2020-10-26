import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators"
import { Image } from "src/app/models/image";
import { Constants } from "src/app/app.constants";

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

  updateImage(image: Image){
    const url = `${this.imageUrl}/pk/${image.pk}`;
    return this.http.put<Image>(url, image, httpOptions);
  }

  postImage(imageModel: Image, imageFile: File){
    console.log(imageModel);
    const url = `${Constants.wikiApiUrl}/image/upload/`;
    const formData: FormData = new FormData();
    for ( var key in imageModel ) {
      if (key==="image"){
        formData.append("image", imageFile, imageFile.name);
      } else if (imageModel[key]){
        formData.append(key, imageModel[key]);
      }
    }

    const options = {headers: new HttpHeaders({"Content-Disposition": `attachment; filename=${imageFile.name}`})}
    return this.http.post(url, formData);
  }

  deleteImage(image_pk: number){
    const url = `${this.imageUrl}/pk/${image_pk}`;
    return this.http.delete<Image>(url, httpOptions);
  }

}
