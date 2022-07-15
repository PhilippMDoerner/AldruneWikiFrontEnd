import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
//models and constants
import { ArticleFormMixin } from "src/app/utils/functions/articleFormMixin"
import { CharacterObject, CharacterOrganization } from "src/app/models/character";
//services
import { CharacterService } from "src/app/services/character/character.service";
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first } from 'rxjs/operators';
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';
import { CharacterPlayerClassConnection, PlayerClass } from 'src/app/models/playerclass';
import { PlayerClassService } from 'src/app/services/player-class.service';
import { CharacterPlayerClassConnectionService } from 'src/app/services/character-player-class-connection.service';
import { OverviewType } from 'src/app/app.constants';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { TokenService } from 'src/app/services/token.service';
import { Organization } from 'src/app/models/organization';
import { OrganizationMembership } from 'src/app/models/organizationMembership';
import { OrganizationMembershipService } from 'src/app/services/organization-membership.service';
import { OrganizationService } from 'src/app/services/organization/organization.service';

@Component({
  selector: 'app-character-article-update',
  templateUrl: './character-article-update.component.html',
  styleUrls: ['./character-article-update.component.scss']
})

export class CharacterArticleUpdateComponent extends ArticleFormMixin {
  //URLs
  updateCancelUrl: string;
  creationCancelUrl: string;

  //Defining ArticleFormMixin Properties
  serverModel: CharacterObject;
  userModel: CharacterObject;
  userModelClass = CharacterObject;

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericCheckbox({key: "player_character", label: "Player Character", defaultValue: false}),
    this.formlyService.genericCheckbox({key: "alive", defaultValue: true}),
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericInput({key: "title", required: false}),
    this.formlyService.customStringSelect({key:"gender", label: "Sex", options: ["Other", "Female", "Male"]}),
    this.formlyService.genericInput({key: "race"}),
    this.formlyService.genericSelect({key: "current_location", sortProp: "name_full", label: "Location", overviewType: OverviewType.Location, campaign: this.campaign.name, required: false}),
  ];

  organizationFormlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "role", isNameInput: true, required: false}),
    this.formlyService.genericDisableSelect({
      key: "organization_id", 
      sortProp: "name_full", 
      label: "Organization", 
      overviewType: OverviewType.Organization, 
      campaign: this.campaign.name,
      disabledExpression: (organization: Organization) => this.hasMembership(organization) ? true : null,
      tooltipMessage: "The organization or group this character is a member of",
      warningMessage: null
    })
  ];

  //Custom Properties
  playerClasses: PlayerClass[];
  isCharacterConnectionCreationState: boolean = false;
  connectionModel: CharacterPlayerClassConnection;

  organizations: Organization[];
  isOrganizationMembershipCreationState: boolean = false;
  membershipModel: OrganizationMembership;

  constructor(
    characterService: CharacterService,
    router: Router,
    private formlyService: MyFormlyService,
    route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    private playerClassService: PlayerClassService,
    private characterConnectionService: CharacterPlayerClassConnectionService,
    private organizationService: OrganizationService,
    private organizationMembershipService: OrganizationMembershipService,
    campaignService: CampaignService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
  ) { 
    super(
      router,
      routingService, 
      warnings, 
      characterService, //articleService
      campaignService,
      globalUrlParams,
      route,
      tokenService
    ) 
  }

  updateRouterLinks(campaignName: string, userModel: CharacterObject, params: Params): void{
    this.updateCancelUrl = this.routingService.getRoutePath("character", {campaign: campaignName, name: userModel.name});
    this.creationCancelUrl = this.routingService.getRoutePath('character-overview', {campaign: campaignName});
  }


  // CONNECTION FORM FUNCTIONS
  toggleConnectionCreateState(){
    if(!this.playerClasses){
      this.playerClassService.list().pipe(first()).subscribe(
        (playerClasses: PlayerClass[]) => this.playerClasses = playerClasses,
        error => this.warnings.showWarning(error)
      );
    }

    this.isCharacterConnectionCreationState = !this.isCharacterConnectionCreationState;

    this.resetConnectionModel();
  }

  deletePlayerClassConnection(connection: CharacterPlayerClassConnection){
    this.characterConnectionService.delete(connection.pk).pipe(first()).subscribe(
      (response) => {
        const playerClassConnectionIndex: number =  this.userModel.player_class_connections.indexOf(connection);
        this.userModel.player_class_connections.splice(playerClassConnectionIndex, 1);
      },
      (error) => this.warnings.showWarning(error),
    )
  }

  createPlayerClassConnection(connection: CharacterPlayerClassConnection){
    connection.player_class = parseInt(connection.player_class as any); //Needed because the manually built select gives you back a string, not a number
    this.characterConnectionService.create(connection).pipe(first()).subscribe(
      (connection: CharacterPlayerClassConnection) => {
        this.userModel.player_class_connections.push(connection);
        this.toggleConnectionCreateState();
      },
      error => this.warnings.showWarning(error)
    )
  }

  resetConnectionModel(){
    this.connectionModel = {player_class: null, character: this.userModel.pk};
  }

  hasConnection(playerClass: PlayerClass){
    return this.userModel.player_class_connections.some((connection: CharacterPlayerClassConnection) => connection.player_class === playerClass.pk);
  }

  // ORGANIZATION MEMBERSHIP FORM FUNCTIONS
  toggleOrganizationMembershipCreateState(){
    if(!this.organizations){
      this.organizationService.campaignList(this.campaign.name).pipe(first()).subscribe(
        (organizations: Organization[]) => this.organizations = organizations,
        error => this.warnings.showWarning(error)
      );
    }

    this.isOrganizationMembershipCreationState = !this.isOrganizationMembershipCreationState;
    
    this.resetOrganizationMembershipModel();
  }

  resetOrganizationMembershipModel(){
    this.membershipModel = {
      role: null, 
      organization_id: null,
      member_id: this.userModel.pk}
  };


  deleteOrganizationMembership(deleteMembership: CharacterOrganization){
    this.organizationMembershipService.delete(deleteMembership.pk).pipe(first()).subscribe(
      (response) => {
        const membershipIndex = this.userModel.organizations.findIndex(
          (membership: CharacterOrganization) => membership.pk === deleteMembership.pk
        );
        this.userModel.organizations.splice(membershipIndex, 1);
      },
      (error) => this.warnings.showWarning(error),
    )
  }

  createOrganizationMembership(membership: OrganizationMembership){
    membership.organization_id = parseInt(membership.organization_id as any); //Needed because the manually built select gives you back a string, not a number
    this.organizationMembershipService.create(membership).pipe(first()).subscribe(
      (character: CharacterObject) => {
        this.userModel = character;
        this.toggleOrganizationMembershipCreateState();
      },
      error => this.warnings.showWarning(error)
    )
  }

  hasMembership(organization: Organization){
    return this.userModel.organizations.some(
      (membership: CharacterOrganization) => membership.organization_id === organization.pk
    );
  }
}
