import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { PreferencesService } from 'src/app/services/preferences/preferences.service';

@Component({
  selector: 'app-colored-sidebar-legend',
  templateUrl: './colored-sidebar-legend.component.html',
  styleUrls: ['./colored-sidebar-legend.component.scss']
})
export class ColoredSidebarLegendComponent implements OnInit, OnDestroy {
  filterSettings: any;
  
  defaultSearchPreferences = {
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
  }

  @Input() interactable: boolean = false;
  @Output() onFilterOptionSelect: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(
    private preferenceService: PreferencesService
  ) { }

  ngOnInit(): void {
    if(this.interactable){
      const storedPreferences = this.preferenceService.getStoredSearchPreferences();
      this.filterSettings = (storedPreferences == null) ? this.defaultSearchPreferences : storedPreferences;
      this.emitCurrentActiveFilters();

    } else {
      this.filterSettings = this.defaultSearchPreferences;
    }
  }

  getArticleOptionNames(): string[]{
    return Object.keys(this.filterSettings);
  }

  selectArticleOption(clickedOption: string): void{
    if (!this.interactable) return // You should not be able to select entries when this thing has been set to not be interactable

    this.filterSettings[clickedOption] = !this.filterSettings[clickedOption];

    this.emitCurrentActiveFilters();
  }

  emitCurrentActiveFilters(){
    const articleOptionNames = this.getArticleOptionNames();
    const selectedOptionNames = articleOptionNames.filter((option: string) => this.filterSettings[option]);
    this.onFilterOptionSelect.emit(selectedOptionNames);
  }

  coloredSidebar(articleType: string): string{
    const sidebarColor: string = Constants.articleTypeSidebarColorMapping[articleType];
    return `sidebar ${sidebarColor}`;
  }

  ngOnDestroy(){
    if(this.interactable){
      this.preferenceService.storeSearchPreferences(this.filterSettings);
    }
  }
}
