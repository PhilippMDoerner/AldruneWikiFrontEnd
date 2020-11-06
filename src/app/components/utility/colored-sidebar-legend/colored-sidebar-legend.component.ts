import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-colored-sidebar-legend',
  templateUrl: './colored-sidebar-legend.component.html',
  styleUrls: ['./colored-sidebar-legend.component.scss']
})
export class ColoredSidebarLegendComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  coloredSidebar(articleType: string): string{
    const sidebarColor: string = Constants.articleTypeSidebarColorMapping[articleType];
    return `sidebar ${sidebarColor}`;
  }
}
