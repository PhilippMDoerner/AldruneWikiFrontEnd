import { Component, OnInit } from '@angular/core';
import { Constants } from "src/app/app.constants";
import { Subject, Observable, Subscription } from "rxjs";
import { Character } from "src/app/models/character";
import { CharacterService } from "src/app/services/character/character.service";
import { OrganizationService } from "src/app/services/organization/organization.service";
import { LocationService } from "src/app/services/location/location.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "src/app/models/location";
import { Organization } from "src/app/models/organization";

@Component({
  selector: 'app-character-article-update',
  templateUrl: './character-article-update.component.html',
  styleUrls: ['./character-article-update.component.scss']
})

export class CharacterArticleUpdateComponent implements OnInit {
  constants: any = Constants;
  characterSubscription: Subscription;
  organizationSubscription: Subscription;
  locationSubscription: Subscription;
  locations: Location[];
  organizations: Organization[];
  character: Character;

  private parameter_subscription: any;

  constructor(
    private characterService: CharacterService,
    private locationService: LocationService,
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const character_name: string = params['name'];
      this.characterSubscription = this.characterService.getCharacter(character_name).subscribe(character => {
        this.character = character;
      });

      this.locationSubscription = this.locationService.getLocations().subscribe(locations => {
        this.locations = locations;
      });

      this.organizationSubscription = this.organizationService.getOrganizations().subscribe(organizations => {
        this.organizations = organizations;
      });
    });
  }

  ngOnDestroy(){
    this.characterSubscription.unsubscribe();
    this.organizationSubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
  }
}
