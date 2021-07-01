import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-colored-sidebar-legend',
  templateUrl: './colored-sidebar-legend.component.html',
  styleUrls: ['./colored-sidebar-legend.component.scss']
})
export class ColoredSidebarLegendComponent implements OnInit {
  articleOptions = {
    Character: false,
    Creature: false,
    Diaryentry: false,
    Encounter: false,
    Item: false,
    Location: false,
    Organization: false,
    Map: false,
    Quest: false,
    Recording: false,
  }

  @Input() interactable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  getArticleOptionNames(): string[]{
    return Object.keys(this.articleOptions);
  }

  selectArticleOption(clickedOption: string): void{
    this.articleOptions[clickedOption] = !this.articleOptions[clickedOption];
  }

  coloredSidebar(articleType: string): string{
    const sidebarColor: string = Constants.articleTypeSidebarColorMapping[articleType];
    return `sidebar ${sidebarColor}`;
  }
}
