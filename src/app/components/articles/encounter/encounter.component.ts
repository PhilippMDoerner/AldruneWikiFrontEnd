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

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss']
})
export class EncounterComponent implements OnInit {
  constants: any = Constants;
  encounter: Encounter;

  addEncounterConnectionState: boolean = false;
  isEncounterDeleteState: boolean = false;

  characters : OverviewItem[];
  baseEncounterConnection: EncounterConnectionObject = new EncounterConnectionObject();

  constructor(
    private encounterService: EncounterServiceService,
    private encounterConnectionService: EncounterConnectionService,
    private overviewService: OverviewService,
    private route: ActivatedRoute,  
    public routingService: RoutingService,
    private warningsService: WarningsService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      const pk: number = params['pk'];
      this.encounterService.getEncounter(pk).pipe(first()).subscribe(
        (encounter: EncounterObject) => this.encounter = encounter,
        error => this.routingService.routeToErrorPage(error)
      );
    })
  }

  onEncounterUpdate(updateText: string){
    this.encounter.description = updateText;
    this.encounterService.updateEncounter(this.encounter).pipe(first()).subscribe(
      (encounter: EncounterObject) => this.encounter = encounter,
      error => this.warningsService.showWarning(error)
    );
  }

  toggleAddEncounterConnectionState(){
    this.addEncounterConnectionState = !this.addEncounterConnectionState;
    if (!this.characters){
      this.overviewService.getOverviewItems('character').pipe(first()).subscribe(
        (characters: OverviewItem[]) => this.characters = characters,
        error => this.warningsService.showWarning(error)
      );
    }
  }

  createEncounterConnection(){
    this.baseEncounterConnection.encounter = this.encounter.pk;
    this.encounterConnectionService.createEncounterConnection(this.baseEncounterConnection).pipe(first()).subscribe(
      (encounterConnection: EncounterConnectionObject) => {
        this.encounter.encounterConnections.push(encounterConnection);
        this.resetBaseEncounterConnection();
        this.addEncounterConnectionState = false;
      },
      error => this.warningsService.showWarning(error)
    );
  }

  deleteEncounterConnection(connection: EncounterConnectionObject){
    this.encounterConnectionService.deleteEncounterConnection(connection.pk).pipe(first()).subscribe(
      response => {
        const connectionIndex: number = this.encounter.encounterConnections.indexOf(connection);
        if (connectionIndex > -1){
          this.encounter.encounterConnections.splice(connectionIndex, 1);
        }
      },
      error => this.warningsService.showWarning(error)
    );
  }

  resetBaseEncounterConnection(){
    this.baseEncounterConnection = new EncounterConnectionObject();
  }

  toggleEncounterDeleteState(){
    this.isEncounterDeleteState = !this.isEncounterDeleteState;
  }

  deleteEncounter(){
    this.encounterService.deleteEncounter(this.encounter.pk).pipe(first()).subscribe(
      response => this.routingService.routeToPath('home1'),
      error => this.warningsService.showWarning(error)
    );
  }
}
