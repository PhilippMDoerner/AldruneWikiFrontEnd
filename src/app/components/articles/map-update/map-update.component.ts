import { Component, OnInit } from '@angular/core';
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
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-map-update',
  templateUrl: './map-update.component.html',
  styleUrls: ['./map-update.component.scss']
})
export class MapUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin Properties
  userModel: MapObject;
  serverModel: Map;
  updateCancelRoute = {routeName: 'map', params: {name: null}};
  creationCancelRoute = {routeName: 'map', params: {name: Constants.defaultMapName}};

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true, required: true}),
    this.formlyService.genericInput({key: "icon", label: "Map Icon", validators: ['faPrefix'], required: false }),
    this.formlyService.singleFileField({key: "image", label: "Map Image", required: this.isInCreateState()})
  ];

  //Custom Properties
  private parameter_subscription: Subscription;


  constructor(
    private formlyService: MyFormlyService,
    mapService: MapService,
    router: Router,
    private route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
  ) { 
    super(
      router, 
      routingService, 
      warnings, 
      mapService
    ) 
  }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const mapName: string = params['name'];
      const campaign: string = params.campaign;

      //Update Cancel Route Params
      this.updateCancelRoute.params.name = mapName;

      //Get Map
      if (this.isInUpdateState()){
        this.articleService.readByParam(campaign, mapName).pipe(first()).subscribe(
          (map: MapObject) => this.userModel = map,
          error => this.routingService.routeToErrorPage(error)
        );
      }  else if (this.isInCreateState()){
        this.userModel = new MapObject();
      }
    })
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
