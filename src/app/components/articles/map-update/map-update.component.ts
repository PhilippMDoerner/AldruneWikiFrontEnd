import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { MapObject, Map } from 'src/app/models/map';
import { MapService } from 'src/app/services/map.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';

@Component({
  selector: 'app-map-update',
  templateUrl: './map-update.component.html',
  styleUrls: ['./map-update.component.scss']
})
export class MapUpdateComponent implements OnInit {

  private parameter_subscription: Subscription;

  constants: any = Constants;

  formState: string;
  isForAssociatedObjectCreation: boolean;

  form = new FormGroup({});
  model: Map;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name"}),
    this.formlyService.genericInput({key: "icon", label: "Map Icon", required: false}),
    this.formlyService.singleFileField({key: "image", label: "Map Image"})
  ];

  constructor(
    private formlyService: MyFormlyService,
    private mapService: MapService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      const mapName: string = params['name'];

      if (this.formState === this.constants.updateState){
        this.mapService.getMap(mapName).pipe(first()).subscribe(map => {
          this.model = map;
        });
      }  else if (this.formState === this.constants.createState){
        this.model = new MapObject();
      }
    })
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.mapService.updateMap(this.model) : this.mapService.createMap(this.model);

    responseObservable.pipe(first()).subscribe((map: Map) => {
      const mapUrl: string = Constants.getRoutePath(this.router, 'map', {name: map.name});
      this.router.navigateByUrl(mapUrl);
    }, error => console.log(error));
  }


  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
