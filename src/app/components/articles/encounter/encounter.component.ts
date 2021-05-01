import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { CharacterObject } from 'src/app/models/character';
import { Encounter, EncounterObject } from 'src/app/models/encounter';
import { EncounterConnectionObject, EncounterConnection } from 'src/app/models/encounterconnection';
import { OverviewItem } from 'src/app/models/overviewItem';
import { EncounterConnectionService } from 'src/app/services/encounter-connection.service';
import { EncounterServiceService } from 'src/app/services/encounter/encounter-service.service';
import { OverviewService } from 'src/app/services/overview.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss']
})
export class EncounterComponent extends ArticleMixin implements OnInit {
  //ArticleMixin Variables
  articleData: Encounter;
  queryParameterName = "pk";
  deleteRoute = {routeName: "home1", params: {}};

  //Custom Variables
  addEncounterConnectionState: boolean = false;
  isEncounterDeleteState: boolean = false;

  characters : OverviewItem[];
  baseEncounterConnection: EncounterConnectionObject = new EncounterConnectionObject();

  constructor(
    encounterService: EncounterServiceService,
    private encounterConnectionService: EncounterConnectionService,
    private overviewService: OverviewService,
    public route: ActivatedRoute,  
    public routingService: RoutingService,
    warningsService: WarningsService,
  ) { 
    super(
      encounterService,
      route,
      routingService,
      warningsService
    )
  }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      const pk: number = params['pk'];
      this.articleService.read(pk).pipe(first()).subscribe(
        (encounter: EncounterObject) => this.articleData = encounter,
        error => this.routingService.routeToErrorPage(error)
      );
    })
  }

  toggleAddEncounterConnectionState(){
    this.addEncounterConnectionState = !this.addEncounterConnectionState;
    if (!this.characters){
      this.overviewService.getOverviewItems('character').pipe(first()).subscribe(
        (characters: OverviewItem[]) => this.characters = characters,
        error => this.warnings.showWarning(error)
      );
    }
  }

  createEncounterConnection(){
    this.baseEncounterConnection.encounter = this.articleData.pk;
    this.encounterConnectionService.create(this.baseEncounterConnection).pipe(first()).subscribe(
      (encounterConnection: EncounterConnectionObject) => {
        this.articleData.encounterConnections.push(encounterConnection);
        this.resetBaseEncounterConnection();
        this.addEncounterConnectionState = false;
      },
      error => this.warnings.showWarning(error)
    );
  }

  deleteEncounterConnection(connection: EncounterConnectionObject){
    this.encounterConnectionService.delete(connection.pk).pipe(first()).subscribe(
      response => {
        const connectionIndex: number = this.articleData.encounterConnections.indexOf(connection);
        const hasConnection: boolean = connectionIndex > -1;
        if (hasConnection){
          this.articleData.encounterConnections.splice(connectionIndex, 1);
        }
      },
      error => this.warnings.showWarning(error)
    );
  }

  resetBaseEncounterConnection(){
    this.baseEncounterConnection = new EncounterConnectionObject();
  }

  toggleEncounterDeleteState(){
    this.isEncounterDeleteState = !this.isEncounterDeleteState;
  }
}
