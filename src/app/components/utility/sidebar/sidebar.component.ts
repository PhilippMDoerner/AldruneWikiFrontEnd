import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constants = Constants;

  @Input() showSidebar: BehaviorSubject<boolean>;

  sidebarEntries: any = [
    {
      title: "Home",
      iconClass: "fa fa-home",
      route: this.routingService.getRoutePath("home2")
    },
    {
      title: "Creatures", 
      iconClass: "fas fa-dragon", 
      route: this.routingService.getRoutePath("creature-overview")
    },
    {
      title: "Characters", 
      iconClass: "fas fa-male", 
      route: this.routingService.getRoutePath("character-overview")
    },
    {
      title: "DiaryEntries", 
      iconClass: "fas fa-book-open", 
      route: this.routingService.getRoutePath("diaryentry-overview")
    },
    {
      title: "Items", 
      iconClass: "fa fa-magic", 
      route: this.routingService.getRoutePath("item-overview")
    },
    {
      title: "Locations", 
      iconClass: "fas fa-compass", 
      route: this.routingService.getRoutePath("location-overview")
    },
    {
      title: "Organizations", 
      iconClass: "fas fa-sitemap", 
      route: this.routingService.getRoutePath("organization-overview")
    },
    {
      title: "Maps", 
      iconClass: "fa fa-map", 
      route: this.routingService.getRoutePath('map', {name: Constants.defaultMapName})
    },
    {
      title: "Quests", 
      iconClass: "fas fa-question-circle", 
      route: this.routingService.getRoutePath("quest-overview")
    },
    {
      title: "Spells", 
      iconClass: "fas fa-hand-sparkles", 
      route: this.routingService.getRoutePath("spells")
    },
    {
      title: "Rules", 
      iconClass: "fa fa-book", 
      route: this.routingService.getRoutePath("rules")
    },
    {
      title: "Recordings", 
      iconClass: "fa fa-file-audio-o", 
      route: this.routingService.getRoutePath("sessionaudio-overview")
    },

  ]

  //TODO: customizeable sidebar order of menu items
  constructor(
    public routingService: RoutingService
  ) { }

  ngOnInit(): void {
  }
}
