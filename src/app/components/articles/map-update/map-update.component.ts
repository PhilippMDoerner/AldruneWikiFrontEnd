import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { EmptyFormLocation, Location } from 'src/app/models/location';
import { EmptyFormMap, Map } from 'src/app/models/map';
import { LocationService } from 'src/app/services/location/location.service';
import { MapService } from 'src/app/services/map.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';

@Component({
  selector: 'app-map-update',
  templateUrl: './map-update.component.html',
  styleUrls: ['./map-update.component.scss']
})
export class MapUpdateComponent implements OnInit {

  private map_subscription: Subscription;
  private parameter_subscription: Subscription;
  private parent_location_subscription: Subscription;

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
    const mapName: string = this.route.snapshot.params['name'];

    if (this.formState === this.constants.updateState){
      this.map_subscription = this.mapService.getMap(mapName).subscribe(map => {
        this.model = map;
      });
    }  else if (this.formState === this.constants.createState){
      this.model = new EmptyFormMap();
    }
  }

  onSubmit(model: Map){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.mapService.updateMap(model) : this.mapService.createMap(model);

    responseObservable.subscribe((map: Map) => {
      this.router.navigateByUrl(`/map/${map.name}`);
    }, error => console.log(error));
  }


  ngOnDestroy(){
    //TODO: Replace this form of unsubscription by using "pipe" on Observable above and using the first() 
    // method (see https://stackoverflow.com/questions/40019177/immediately-unsubscribing-from-rxjs-observable for reference)
    // Do so for all views
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.map_subscription) this.map_subscription.unsubscribe();
    if (this.parent_location_subscription) this.parent_location_subscription.unsubscribe();
  }
}
