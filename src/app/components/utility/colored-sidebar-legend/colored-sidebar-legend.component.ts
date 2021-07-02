import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { PreferencesService } from 'src/app/services/preferences/preferences.service';

@Component({
  selector: 'app-colored-sidebar-legend',
  templateUrl: './colored-sidebar-legend.component.html',
  styleUrls: ['./colored-sidebar-legend.component.scss']
})
export class ColoredSidebarLegendComponent implements OnInit, OnDestroy {
  articleOptions: any;
  
  defaultSearchPreferences = {
    character: false,
    creature: false,
    diaryentry: false,
    encounter: false,
    item: false,
    location: false,
    organization: false,
    map: false,
    quest: false,
    recording: false,
  }

  //TODO: Store preferences in services and work with that

  @Input() interactable: boolean = false;
  @Output() onFilterOptionSelect: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(
    private preferenceService: PreferencesService
  ) { }

  ngOnInit(): void {
    const storedPreferences = this.preferenceService.getStoredSearchPreferences();
    this.articleOptions = (storedPreferences == null) ? this.defaultSearchPreferences : storedPreferences
  }

  getArticleOptionNames(): string[]{
    return Object.keys(this.articleOptions);
  }

  selectArticleOption(clickedOption: string): void{
    if (!this.interactable) return // You should not be able to select entries when this thing has been set to not be interactable

    this.articleOptions[clickedOption] = !this.articleOptions[clickedOption];

    this.emitSelectEvent();
  }

  emitSelectEvent(){
    const articleOptionNames = this.getArticleOptionNames();
    const selectedOptionNames = articleOptionNames.filter((option: string) => this.articleOptions[option]);
    this.onFilterOptionSelect.emit(selectedOptionNames);
  }

  coloredSidebar(articleType: string): string{
    const sidebarColor: string = Constants.articleTypeSidebarColorMapping[articleType];
    return `sidebar ${sidebarColor}`;
  }

  ngOnDestroy(){
    this.preferenceService.storeSearchPreferences(this.articleOptions);
  }
}
