import { Component, OnInit } from '@angular/core';
import { Subject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
//models and constants
import { Constants } from "src/app/app.constants";
import { Character, EmptyFormCharacter } from "src/app/models/character";
import { Location } from "src/app/models/location";
import { Organization } from "src/app/models/organization";
//services
import { CharacterService } from "src/app/services/character/character.service";
import { OrganizationService } from "src/app/services/organization/organization.service";
import { LocationService } from "src/app/services/location/location.service";

@Component({
  selector: 'app-character-article-update',
  templateUrl: './character-article-update.component.html',
  styleUrls: ['./character-article-update.component.scss']
})

export class CharacterArticleUpdateComponent implements OnInit {
  constants: any = Constants;
  formState: string;
  form = new FormGroup({});
  model: Character | EmptyFormCharacter;
  fields: FormlyFieldConfig[] = [
    {
      key: "player_character",
      type: "checkbox",
      defaultValue: false,
      templateOptions: {
        label: "Player Character",
      }
    },
    {
      key: "alive",
      type: "checkbox",
      defaultValue: true,
      templateOptions:{
        label: "Alive"
      }
    },
    {
      key: "name",
      type: "input",
      templateOptions:{
        label: "Name"
      }
    },
    {
      key: "title",
      type: "input",
      templateOptions:{
        label: "Title"
      }
    },
    {
      key: "gender",
      type: "select",
      templateOptions:{
        label: "Sex",
        options: [
          {label: "Other", value: "Other"},
          {label: "Female", value: "Female"},
          {label: "Male", value: "Male"},
        ]
      }
    },
    {
      key: "race",
      type: "input",
      templateOptions:{
        label: "Race"
      }
    },
    {
      key: "organization",
      type: "select",
      templateOptions:{
        label: "Organization",
        labelProp: "name",
        valueProp: "pk",
        options: this.organizationService.getOrganizations(),
      }
    },
    {
      key: "current_location",
      type: "select",
      templateOptions:{
        label: "Location",
        labelProp: "name_full",
        valueProp: "pk",
        options: this.locationService.getLocations(),
      }
    }
  ];

  private characterSubscription: Subscription;
  private organizationSubscription: Subscription;
  private locationSubscription: Subscription;
  private parameter_subscription: Subscription;

  locations: Location[];
  organizations: Organization[];


  constructor(
    private characterService: CharacterService,
    private locationService: LocationService,
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;

    if (this.formState === this.constants.updateState){
      this.parameter_subscription = this.route.params.subscribe(params => {
        const character_name: string = params['name'];
        this.characterSubscription = this.characterService.getCharacter(character_name).subscribe(character => {
          this.model = character;
        }, error => this.router.navigateByUrl("error"));
      });
    } else if (this.formState === this.constants.createState) {
      this.model = new EmptyFormCharacter();
    }

    this.locationSubscription = this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
    }, error => this.router.navigateByUrl("error"));

    this.organizationSubscription = this.organizationService.getOrganizations().subscribe(organizations => {
      this.organizations = organizations;
    }, error => this.router.navigateByUrl("error"));
  }

  onSubmit(model: any){
    if (this.formState === this.constants.updateState){
      this.characterService.updateCharacter(model).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl(`/character/${model.name}`);
      }, error => this.router.navigateByUrl("error"));
    } else if (this.formState === this.constants.createState){
      this.characterService.createCharacter(model).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl(`character/${model.name}`);
      }, error => {
        console.log(error);
        this.router.navigateByUrl("error");
      });
    }
  }

  ngOnDestroy(){
    if (this.formState === this.constants.updateState){
      this.parameter_subscription.unsubscribe();
      this.characterSubscription.unsubscribe();
    }
    this.organizationSubscription.unsubscribe();
    this.locationSubscription.unsubscribe();
  }
}
