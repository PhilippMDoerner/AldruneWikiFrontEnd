import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { SearchPreferences } from 'src/app/models/search-preferences';
import { PreferencesService } from 'src/app/services/preferences/preferences.service';

@Component({
  selector: 'app-colored-sidebar-legend',
  templateUrl: './colored-sidebar-legend.component.html',
  styleUrls: ['./colored-sidebar-legend.component.scss']
})
export class ColoredSidebarLegendComponent implements OnInit, OnDestroy {
  filterSettings: SearchPreferences;
  settingNames: string[];
  settingCssClasses: {[key: string]: string};
  
  defaultSearchPreferences: SearchPreferences = {
    character: false,
    creature: false,
    diaryentry: false,
    encounter: false,
    item: false,
    location: false,
    map: false,
    organization: false,
    quest: false,
    recording: false,
    rules: false,
    spell: false
  }

  @Input() interactable: boolean = false;
  @Output() onFilterOptionSelect: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(
    private preferenceService: PreferencesService
  ) { }

  ngOnInit(): void {
    if(this.interactable){
      const storedPreferences: SearchPreferences = this.preferenceService.getStoredSearchPreferences();
      this.filterSettings = (storedPreferences == null) ? this.defaultSearchPreferences : storedPreferences;

    } else {
      this.filterSettings = this.defaultSearchPreferences;
    }

    this.settingNames = Object.keys(this.filterSettings);
    this.emitCurrentActiveFilters();

    this.settingCssClasses = this.calculateSettingCssClasses(this.settingNames);
  }

  selectArticleOption(clickedOption: string): void{
    if (!this.interactable) return // You should not be able to select entries when this thing has been set to not be interactable

    this.filterSettings[clickedOption] = !this.filterSettings[clickedOption];

    this.emitCurrentActiveFilters();
  }

  emitCurrentActiveFilters(){
    const selectedOptionNames = this.settingNames.filter((option: string) => this.filterSettings[option]);
    const modifiedOptionNames = selectedOptionNames.map((option: string) => option === "recording" ? "sessionaudio" : option);

    this.onFilterOptionSelect.emit(modifiedOptionNames);
  }

  calculateSettingCssClasses(settingNames: string[]): {[key: string]: string}{
    const cssClassStrings: string[] = settingNames
      .map(name => {
        const sidebarColor: string = Constants.articleTypeSidebarColorMapping[name];
        return `sidebar ${sidebarColor}`;
      });
    
    let settingObject = {};
    for(let i = 0; i < settingNames.length; i++){
      const cssClass = cssClassStrings[i];
      const settingName = settingNames[i];
      settingObject[settingName] = cssClass;
    }

    return settingObject
  }

  ngOnDestroy(){
    if(this.interactable){
      this.preferenceService.storeSearchPreferences(this.filterSettings);
    }
  }
}
