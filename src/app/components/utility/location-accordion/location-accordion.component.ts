import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { LocationObject } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location/location.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-location-accordion',
  templateUrl: './location-accordion.component.html',
  styleUrls: ['./location-accordion.component.scss']
})
export class LocationAccordionComponent extends PermissionUtilityFunctionMixin implements OnInit {
  constants: any = Constants;
  @Input() sublocations: LocationObject[];
  isOpen: object;

  constructor(
    private locationService: LocationService,
    private warnings: WarningsService,
    public routingService: RoutingService,
  ) { super() }

  ngOnInit(): void {
    this.isOpen = {};

    this.sublocations.forEach((location, index) => {
      const accordionPanelId = `static-${index}`;
      this.isOpen[accordionPanelId] = false;
    });
  }

  onSublocationUpdate(updateText: string, sublocationIndex: number){
    const sublocationToUpdate: LocationObject = this.sublocations[sublocationIndex];
    const oldDescription = sublocationToUpdate.description;
    sublocationToUpdate.description = updateText;

    this.locationService.updateLocation(sublocationToUpdate).pipe(first()).subscribe(
      (updatedSublocation: LocationObject) => {},
      error => this.warnings.showWarning(error)
    );
  }

  onPanelChange({panelId}){
    for (const key in this.isOpen) {
      const isClickedPanel: boolean = (key === panelId);
      this.isOpen[key] = isClickedPanel ? !this.isOpen[key]: false;
    }
  }

  panelIsOpen(index: number){
    return this.isOpen[`static-${index}`];
  }
}
