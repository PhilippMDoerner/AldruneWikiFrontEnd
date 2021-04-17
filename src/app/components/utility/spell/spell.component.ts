import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { PlayerClass, PlayerClassObject } from 'src/app/models/playerclass';
import { Spell, SpellObject, SpellPlayerClassConnection } from 'src/app/models/spell';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { PlayerClassService } from 'src/app/services/player-class.service';
import { RoutingService } from 'src/app/services/routing.service';
import { SpellPlayerClassConnectionService } from 'src/app/services/spell-player-class-connection.service';
import { SpellService } from 'src/app/services/spell.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss']
})
export class SpellComponent extends PermissionUtilityFunctionMixin implements OnInit {
  @Input() spell: SpellObject;
  @Input() index: number;

  @Output() classSelect: EventEmitter<String> = new EventEmitter();
  @Output() deleteSpell: EventEmitter<number> = new EventEmitter();

  @ViewChild('spellCard') spellCard: ElementRef;

  //EDIT VARIABLES

  isCreateState: Boolean;
  isUpdateState: Boolean = false;
  isSpellConnectionCreateState: boolean = false;
  connectionModel: SpellPlayerClassConnection;
  playerClasses: PlayerClass[];

  isPanelOpen: Boolean = false;
  constants: any = Constants;

  castingTimeOptions: {label: String, value: String | Number}[] = [
    {label: '1 Action',       value: '1 Action'},
    {label: '1 Bonus Action', value: '1 Bonus Action'},
    {label: '1 Reaction',     value: '1 Reaction'},
    {label: '1 Minute',       value: '1 Minute'},
    {label: '10 Minutes',     value: '10 Minutes'},
    {label: '1 Hour',         value: '1 Hour'},
    {label: '8 Hours',        value: '8 Hours'},
    {label: '12 Hours',       value: '12 Hours'},
    {label: '24 Hours',       value: '24 Hours'}
  ]

  savingThrowOptions: {label: String, value: String | Number}[] = [
    { value: 'ATK', label: 'Attack'},
    { value: "STR", label: "Strength"},
    { value: "CON", label: "Constitution"},
    { value: "DEX", label: "Dexterity"},
    { value: "INT", label: "Intelligence"},
    { value: "WIS", label: "Wisdom"},
    { value: "CHA", label: "Charisma"}
  ]

  spellLevelOptions: {label: String, value: Number}[] = [
    { value: 0, label: 'Cantrip'},
    { value: 1, label: '1'},
    { value: 2, label: '2'},
    { value: 3, label: '3'},
    { value: 4, label: '4'},
    { value: 5, label: '5'},
    { value: 6, label: '6'},
    { value: 7, label: '7'},
    { value: 8, label: '8'},
    { value: 9, label: '9'}
  ]

  durationOptions: {label: String, value: String | Number}[] =  [
    { value: 'Instantaneous',   label: 'Instantaneous'},
    { value: '1 Round',         label: '1 Round'},
    { value: '6 Rounds',        label: '6 Rounds'},
    { value: '1 Minute',        label: '1 Minute'},
    { value: '10 Minutes',      label: '10 Minutes'},
    { value: '1 Hour',          label: '1 Hour'},
    { value: '2 Hours',         label: '2 Hours'},
    { value: '8 Hours',         label: '8 Hours'},
    { value: '24 Hours',        label: '24 Hours'},
    { value: '1 Day',           label: '1 Day'},
    { value: '7 Day',           label: '7 Days'},
    { value: '10 Day',          label: '10 Days'},
    { value: '30 Day',          label: '30 Days'},
    { value: 'Special',         label: 'Special'},
    { value: 'Until Dispelled', label: 'Until Dispelled'}
  ]

  rangeOptions: {label: String, value: String | Number}[] = [
    { value: 'Self',     label: 'Self'},
    { value: '5 Feet',   label: '5 Feet'},
    { value: '10 Feet',  label: '10 Feet'},
    { value: '15 Feet',  label: '15 Feet'},
    { value: '30 Feet',  label: '30 Feet'},
    { value: '60 Feet',  label: '60 Feet'},
    { value: '90 Feet',  label: '90 Feet'},
    { value: '100 Feet', label: '100 Feet'},
    { value: '120 Feet', label: '120 Feet'},
    { value: '150 Feet', label: '150 Feet'},
    { value: '1 Mile',   label: '1 Mile'},
    { value: '3 Miles',  label: '3 Miles'},
    { value: '10 Miles', label: '10 Miles'}
  ]

  componentOptions = [
    { value: 'V',   label: 'V'},
    { value: 'S',   label: 'S'},
    { value: 'M',   label: 'M'},
    { value: 'VS',  label: 'VS'},
    { value: 'VM',  label: 'VM'},
    { value: 'SM',  label: 'SM'},
    { value: 'VSM', label: 'VSM'},
    { value: 'VSM*',label: 'VSM*'}
  ]

  schoolOptions = [
    { value: 'Abjuration',    label: 'Abjuration'},
    { value: 'Conjuration',   label: 'Conjuration'},
    { value: 'Divination',    label: 'Divination'},
    { value: 'Enchantment',   label: 'Enchantment'},
    { value: 'Evocation',     label: 'Evocation'},
    { value: 'Illusion',      label: 'Illusion'},
    { value: 'Necromancy',    label: 'Necromancy'},
    { value: 'Transmutation', label: 'Transmutation'}
  ]

  fields: FormlyFieldConfig[] = [
    this.formlyService.genericCheckbox({key: "concentration", label: "Concentration", defaultValue: false}),
    this.formlyService.genericCheckbox({key: "ritual", defaultValue: false}),
    this.formlyService.genericInput({key: "name"}),
    this.formlyService.customSelect({key: "spell_level", label: "Spell Level", options: this.spellLevelOptions}),
    this.formlyService.customSelect({key: "casting_time", label: "Casting Time", options: this.castingTimeOptions}),
    this.formlyService.customSelect({key: "duration", options: this.durationOptions}),
    this.formlyService.customSelect({key: "range", options: this.rangeOptions}),
    this.formlyService.customSelect({key: "components", options: this.componentOptions}),
    this.formlyService.customSelect({key: "school", options: this.schoolOptions}),
    this.formlyService.customSelect({key: "saving_throw", options: this.savingThrowOptions, required: false}),
    this.formlyService.genericInput({key: "damage", label: "Effect", maxLength: 40, required: false}),
    this.formlyService.genericInput({key: "classes", maxLength: 200}),
    this.formlyService.genericTextField({key: "description"}),
  ];

  constructor(
    private spellService: SpellService,
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
    private spellConnectionService: SpellPlayerClassConnectionService,
    private playerClassService: PlayerClassService,
    public tokenService: TokenService,
  ) { super() }

  ngOnInit(): void {
    this.isCreateState = this.spell.name === "New Spell";
    this.isPanelOpen = this.isCreateState
  }

  togglePanel(event: any){
    const isClickOnClassBadge = event.target.classList.contains("badge");
    const isClickOnIcon = event.target.classList.contains("icon");
    const isClickOnForm = event.target.tagName === "FORM" || event.target.parentElement?.tagName === "FORM" || event.target.parentElement?.parentElement?.tagName === "FORM";
    if(isClickOnClassBadge || isClickOnIcon || isClickOnForm) return;

    this.isPanelOpen = !this.isPanelOpen;
  }

  onSubmit(){
    const responseObservable: Observable<Spell> =  this.isUpdateState ? this.spellService.updateSpell(this.spell) : this.spellService.createSpell(this.spell);

    responseObservable.pipe(first()).subscribe(
      (spell: SpellObject) => {
        this.spell = spell;
        this.isUpdateState = false;
        this.isCreateState = false;
      },
      error => this.warnings.showWarning(error)
    );
  }

  onCancel(){
    this.isUpdateState = false;
    if(this.isCreateState){
      this.removeSpell();
    }
  }

  removeSpell(){
    animateElement(this.spellCard.nativeElement, 'fadeOutDown')
      .then(() => this.deleteSpell.emit(this.index));
  }

  onDelete(){
    this.spellService.deleteSpell(this.spell.pk).pipe(first()).subscribe(
      () => this.removeSpell(),
      error => this.warnings.showWarning(error)
    );
  }

  toggleFormState(){
    if(!this.isCreateState && !this.isUpdateState){
      this.isUpdateState = true;
    } else if (this.isUpdateState){
      this.isCreateState = false;
      this.isUpdateState = false;
    } else if (this.isCreateState){ //If you are in create state and toggle out of it, you want to remove the added spell
      this.removeSpell();
    }
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
    this.spellConnectionService.deleteSpellClassConnection(connection.pk).pipe(first()).subscribe(
      (response) => {
        const spellConnectionIndex: number =  this.spell.player_class_connections.indexOf(connection);
        this.spell.player_class_connections.splice(spellConnectionIndex, 1);
      },
      (error) => this.warnings.showWarning(error),
    )
  }

  createSpellPlayerClassConnection(connection: SpellPlayerClassConnection){
    this.spellConnectionService.createSpellClassConnection(connection).pipe(first()).subscribe(
      (connection: SpellPlayerClassConnection) => {
        this.spell.player_class_connections.push(connection);
        this.toggleConnectionCreateState();
      },
      error => this.warnings.showWarning(error)
    )
  }

  resetConnectionModel(){
    this.connectionModel = {player_class: null, spell: this.spell.pk};
  }

  hasConnection(playerClass: PlayerClass){
    return this.spell.player_class_connections.some((connection: SpellPlayerClassConnection) => connection.player_class === playerClass.pk);
  }
}
