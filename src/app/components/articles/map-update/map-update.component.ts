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
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-map-update',
  templateUrl: './map-update.component.html',
  styleUrls: ['./map-update.component.scss']
})
export class MapUpdateComponent implements OnInit {

  private parameter_subscription: Subscription;

  constants: any = Constants;

  formState: string;

  model: Map;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true, required: true}),
    this.formlyService.genericInput({key: "icon", label: "Map Icon", validators: ['faPrefix'], required: false }),
    this.formlyService.singleFileField({key: "image", label: "Map Image", required: true})
  ];

  constructor(
    private formlyService: MyFormlyService,
    private mapService: MapService,
    private router: Router,
    private route: ActivatedRoute,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    this.parameter_subscription = this.route.params.subscribe(params => {
      const mapName: string = params['name'];

      if (this.formState === this.constants.updateState){
        this.mapService.getMap(mapName).pipe(first()).subscribe(
          (map: MapObject) => this.model = map,
          error => this.routingService.routeToErrorPage(error)
        );
      }  else if (this.formState === this.constants.createState){
        this.model = new MapObject();
      }
    })
  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.mapService.updateMap(this.model) : this.mapService.createMap(this.model);

    responseObservable.pipe(first()).subscribe(
      (map: MapObject) => this.routingService.routeToApiObject(map),
      error => this.warnings.showWarning(error)
    );
  }

  onCancel(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)
    if (isFormInUpdateState){
      const mapName: string = this.route.snapshot.params.name;
      this.routingService.routeToPath('map', {name: mapName});
    } else {
      this.routingService.routeToPath('map', {name: Constants.defaultMapName});
    } 
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
