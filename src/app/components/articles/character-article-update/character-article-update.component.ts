import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FormlyFieldConfig } from "@ngx-formly/core";
//models and constants
import { ArticleFormMixin } from "src/app/utils/functions/articleFormMixin"
import { CharacterObject } from "src/app/models/character";
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

@Component({
  selector: 'app-character-article-update',
  templateUrl: './character-article-update.component.html',
  styleUrls: ['./character-article-update.component.scss']
})

export class CharacterArticleUpdateComponent extends ArticleFormMixin implements OnInit, OnDestroy {
  //Defining ArticleFormMixin Properties
  serverModel: CharacterObject;
  userModel: CharacterObject;
  updateCancelRoute = {routeName: "character", params: {name: null, campaign: this.campaign}};
  creationCancelRoute = {routeName: "character-overview", params: {campaign: this.campaign}};

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericCheckbox({key: "player_character", label: "Player Character", defaultValue: false}),
    this.formlyService.genericCheckbox({key: "alive", defaultValue: true}),
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericInput({key: "title", required: false}),
    this.formlyService.customStringSelect({key:"gender", label: "Sex", options: ["Other", "Female", "Male"]}),
    this.formlyService.genericInput({key: "race"}),
    this.formlyService.genericSelect({key: "organization", overviewType: OverviewType.Organization, campaign: this.campaign, required: false}),
    this.formlyService.genericSelect({key: "current_location", label: "Location", overviewType: OverviewType.Location, campaign: this.campaign, required: false}),
  ];

  //Custom Properties
  playerClasses: PlayerClass[];
  isCharacterConnectionCreationState: boolean = false;
  connectionModel: CharacterPlayerClassConnection;

  private parameter_subscription: Subscription;

  constructor(
    characterService: CharacterService,
    router: Router,
    private formlyService: MyFormlyService,
    route: ActivatedRoute,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    private playerClassService: PlayerClassService,
    private characterConnectionService: CharacterPlayerClassConnectionService,
    private campaignService: CampaignService,
  ) { 
    super(
      router,
      routingService, 
      warnings, 
      characterService, //articleService
      route,
    ) 
  }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      if (this.isInUpdateState()){
        const character_name: string = params.name;
        this.campaign = params.campaign;

        //Update Cancel Route Params
        this.updateCancelRoute.params.name = character_name;
        
        this.fetchUserModel(character_name)
      } else if (this.isInCreateState()) {
        this.createUserModel();
      }
    });
  }

  fetchUserModel(character_name: string): void{
    this.articleService.readByParam(this.campaign, character_name).pipe(first()).subscribe(
      (character: CharacterObject) => this.userModel = character, 
      error => this.routingService.routeToErrorPage(error)
    );
  }

  createUserModel(): void{
    this.campaignService.readByParam(this.campaign).pipe(first()).subscribe(
      (campaignData: {name: String, pk: number}) => {
        this.userModel = new CharacterObject();
        this.userModel.campaign = campaignData.pk;
      },
      error => this.warnings.showWarning(error)
    )
  }

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
        const spellConnectionIndex: number =  this.userModel.player_class_connections.indexOf(connection);
        this.userModel.player_class_connections.splice(spellConnectionIndex, 1);
      },
      (error) => this.warnings.showWarning(error),
    )
  }

  createPlayerClassConnection(connection: CharacterPlayerClassConnection){
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


  ngOnDestroy(): void{
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
