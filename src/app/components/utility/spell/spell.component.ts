import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { PlayerClass } from 'src/app/models/playerclass';
import { Spell, SpellObject, SpellPlayerClassConnection } from 'src/app/models/spell';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { PlayerClassService } from 'src/app/services/player-class.service';
import { RoutingService } from 'src/app/services/routing.service';
import { SpellPlayerClassConnectionService } from 'src/app/services/spell-player-class-connection.service';
import { SpellService } from 'src/app/services/spell.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { CardFormMixin } from 'src/app/utils/functions/cardMixin';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss']
})
export class SpellComponent extends CardFormMixin implements OnInit {
  //CardFormMixin variables
  @Input() cardData: SpellObject;

  userModel: SpellObject;
  userModelClass = SpellObject;
  serverModel: Spell;

  @Output() classSelect: EventEmitter<String> = new EventEmitter();
  cardDelete = new EventEmitter<number>()

  @ViewChild('spellCard') card: ElementRef;

  //Custom Variables
  //EDIT VARIABLES

  isSpellConnectionCreateState: boolean = false;
  connectionModel: SpellPlayerClassConnection;
  playerClasses: PlayerClass[];

  //TODO: Replace the VSM with a radiobutton group that adds its values together
  //TODO: Replace the saving throw with a radiobuttongroup out of which you can choose 1 options
  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericCheckbox({key: "concentration", label: "Concentration", defaultValue: false}),
    this.formlyService.genericCheckbox({key: "ritual", defaultValue: false}),
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.customSelect({key: "spell_level", label: "Spell Level", options: Constants.spellLevelOptions}),
    this.formlyService.customSelect({key: "casting_time", label: "Casting Time", options: Constants.castingTimeOptions}),
    this.formlyService.customSelect({key: "duration", options: Constants.durationOptions}),
    this.formlyService.customSelect({key: "range", options: Constants.rangeOptions}),
    this.formlyService.customSelect({key: "components", options: Constants.componentOptions}),
    this.formlyService.customSelect({key: "school", options: Constants.schoolOptions}),
    this.formlyService.customSelect({key: "saving_throw", label: "Saving Throw", options: Constants.savingThrowOptions, required: false}),
    this.formlyService.genericInput({key: "damage", label: "Effect", maxLength: 40, required: false}),
    this.formlyService.genericTextField({key: "description"}),
  ];

  constructor(
    spellService: SpellService,
    private formlyService: MyFormlyService,
    public warnings: WarningsService,  
    public routingService: RoutingService,
    private spellConnectionService: SpellPlayerClassConnectionService,
    private playerClassService: PlayerClassService,
    tokenService: TokenService,
    public element: ElementRef, //Allows calling this from the outside for scroll into view
    route: ActivatedRoute
  ) { 
    super(
      warnings,
      spellService,
      route,
      tokenService
    );
  }

  toggleSpellCard(event: any){
    const isClickOnClassBadge = event.target.classList.contains("badge");
    const isClickOnForm = event.target.tagName === "FORM" || event.target.parentElement?.tagName === "FORM" || event.target.parentElement?.parentElement?.tagName === "FORM";
    if(isClickOnClassBadge || isClickOnForm) return;

    this.toggleCard();
  }

  emitClassSelectEvent(event:any, className: string){
    const isClickOnConnectionIcon = event.target.classList.contains("icon");
    if(isClickOnConnectionIcon) return;

    this.classSelect.emit(className);
  }

  //SPELL PLAYERCLASS CONNECTION
  toggleConnectionCreateState(){
    if(!this.playerClasses){
      this.playerClassService.list().pipe(first()).subscribe(
        (playerClasses: PlayerClass[]) => this.playerClasses = playerClasses,
        error => this.warnings.showWarning(error)
      );
    }

    this.isSpellConnectionCreateState = !this.isSpellConnectionCreateState;

    this.resetConnectionModel();
  }

  deleteSpellPlayerClassConnection(connection: SpellPlayerClassConnection){
    this.spellConnectionService.delete(connection.pk).pipe(first()).subscribe(
      (response) => {
        const spellConnectionIndex: number =  this.cardData.player_class_connections.indexOf(connection);
        this.cardData.player_class_connections.splice(spellConnectionIndex, 1);
      },
      (error) => this.warnings.showWarning(error),
    )
  }

  createSpellPlayerClassConnection(connection: SpellPlayerClassConnection){
    connection.player_class = parseInt(`${connection.player_class}`);
    this.spellConnectionService.create(connection).pipe(first()).subscribe(
      (connection: SpellPlayerClassConnection) => {
        this.cardData.player_class_connections.push(connection);
        this.toggleConnectionCreateState();
      },
      error => this.warnings.showWarning(error)
    )
  }

  resetConnectionModel(){
    this.connectionModel = {player_class: null, spell: this.cardData.pk};
  }

  hasConnection(playerClass: PlayerClass){
    return this.cardData.player_class_connections.some((connection: SpellPlayerClassConnection) => connection.player_class === playerClass.pk);
  }
}
