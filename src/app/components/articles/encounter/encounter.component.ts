import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Encounter } from 'src/app/models/encounter';
import { EncounterConnectionObject, EncounterConnection } from 'src/app/models/encounterconnection';
import { OverviewItem } from 'src/app/models/overviewItem';
import { EncounterConnectionService } from 'src/app/services/encounter-connection.service';
import { EncounterServiceService } from 'src/app/services/encounter/encounter-service.service';
import { OverviewService } from 'src/app/services/overview.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.scss']
})
export class EncounterComponent implements OnInit {
  constants: any = Constants;
  encounter: Encounter;
  encounter_subscription: Subscription;

  addEncounterConnectionState: boolean = false;
  isEncounterDeleteState: boolean = false;

  characters : OverviewItem[];
  baseEncounterConnection: EncounterConnectionObject = new EncounterConnectionObject();

  constructor(
    private encounterService: EncounterServiceService,
    private encounterConnectionService: EncounterConnectionService,
    private overviewService: OverviewService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const pk: number = this.route.snapshot.params['pk'];
    this.encounter_subscription = this.encounterService.getEncounter(pk).subscribe(encounter => {
      this.encounter = encounter;
    });
  }

  onEncounterUpdate(updateText: string){
    this.encounter.description = updateText;
    this.encounterService.updateEncounter(this.encounter).subscribe(encounter => {
      this.encounter = encounter;
    }, error => console.log(error));
  }

  toggleAddEncounterConnectionState(){
    this.addEncounterConnectionState = !this.addEncounterConnectionState;
    if (!this.characters){
      this.overviewService.getOverviewItems('character').pipe(first()).subscribe(characters => {
        this.characters = characters;
      });
    }
  }

  createEncounterConnection(){
    this.baseEncounterConnection.encounter = this.encounter.pk;
    this.encounterConnectionService.createEncounterConnection(this.baseEncounterConnection).pipe(first()).subscribe(encounterConnection => {
      this.encounter.encounterConnections.push(encounterConnection);
      this.resetBaseEncounterConnection();
      this.addEncounterConnectionState = false;
    });
  }

  deleteEncounterConnection(connection: EncounterConnection){
    this.encounterConnectionService.deleteEncounterConnection(connection.pk).pipe(first()).subscribe(response => {
      const connectionIndex: number = this.encounter.encounterConnections.indexOf(connection);
      if (connectionIndex > -1){
        this.encounter.encounterConnections.splice(connectionIndex, 1);
      }
    });
  }

  resetBaseEncounterConnection(){
    this.baseEncounterConnection = new EncounterConnectionObject();
  }

  toggleEncounterDeleteState(){
    this.isEncounterDeleteState = !this.isEncounterDeleteState;
  }

  deleteEncounter(){
    this.encounterService.deleteEncounter(this.encounter.pk).pipe(first()).subscribe(response => {
      this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if(this.encounter_subscription) this.encounter_subscription.unsubscribe();
  }
}
