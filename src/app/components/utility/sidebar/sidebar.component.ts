import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';
import 'hammerjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit {
  constants = Constants;

  test: boolean = false; 
  @Input() showSidebar: BehaviorSubject<boolean>;

  sidebarEntries: any = [
    {
      title: "Creatures", 
      iconClass: "fas fa-paw", 
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
      route: this.routingService.getRoutePath("creature-overview")
    },
    {
      title: "Items", 
      iconClass: "fa fa-diamond", 
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
      iconClass: "fas fa-magic", 
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

  constructor(
    public routingService: RoutingService
  ) { }

  ngOnInit(): void {
  }
}
