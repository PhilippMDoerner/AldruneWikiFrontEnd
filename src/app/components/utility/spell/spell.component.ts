import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Spell, SpellObject } from 'src/app/models/spell';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { SpellService } from 'src/app/services/spell.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-spell',
  templateUrl: './spell.component.html',
  styleUrls: ['./spell.component.scss']
})
export class SpellComponent implements OnInit {
  @Input() spell: SpellObject;
  @Input() index: number;
  isPanelOpen: Boolean = false;

  //EDIT VARIABLES

  @Output() deleteSpell: EventEmitter<number> = new EventEmitter();
  isCreateState: Boolean;
  isUpdateState: Boolean = false;
  constants: any = Constants;
  formState: string;

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
  ) { }

  //TODO: Fix "ExpressionChangedAfterItHasBeenChecked" error
  ngOnInit(): void {
    this.isCreateState = this.spell.name === "New Spell";
    this.isPanelOpen = this.isCreateState
  }

  togglePanel(){
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
      this.deleteSpell.emit(this.index);
    }
  }

  onDelete(){
    this.spellService.deleteSpell(this.spell.id).pipe(first()).subscribe(
      () => this.deleteSpell.emit(this.index),
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
      this.deleteSpell.emit(this.index);
    }
  }
}
