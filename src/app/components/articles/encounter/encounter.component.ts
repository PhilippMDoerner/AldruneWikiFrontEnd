import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Encounter } from 'src/app/models/encounter';
import { EncounterConnection } from 'src/app/models/encounterconnection';
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
  constants: Constants;
  encounter: Encounter;
  encounter_subscription: Subscription;
  character_subscription: Subscription;
  connection_subscription: Subscription;

  addEncounterConnectionState: boolean = false;
  isEncounterDeleteState: boolean = false;

  characters : OverviewItem[];
  baseEncounterConnection: EncounterConnection = {"character": null, "encounter": null};

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
      this.character_subscription = this.overviewService.getOverviewItems('character').subscribe(characters => {
        this.characters = characters;
      });
    }
  }

  createEncounterConnection(){
    this.baseEncounterConnection.encounter = this.encounter.pk;
    this.encounterConnectionService.createEncounterConnection(this.baseEncounterConnection).subscribe(encounterConnection => {
      this.encounter.encounterConnections.push(encounterConnection);
      this.resetBaseEncounterConnection();
      this.addEncounterConnectionState = false;
    });
  }

  deleteEncounterConnection(connection: EncounterConnection){
    this.connection_subscription = this.encounterConnectionService.deleteEncounterConnection(connection.pk).subscribe(response => {
      const connectionIndex: number = this.encounter.encounterConnections.indexOf(connection);
      if (connectionIndex > -1){
        this.encounter.encounterConnections.splice(connectionIndex, 1);
      }
    });
  }

  resetBaseEncounterConnection(){
    this.baseEncounterConnection = {"character": null, "encounter": null};
  }

  toggleEncounterDeleteState(){
    this.isEncounterDeleteState = !this.isEncounterDeleteState;
  }

  deleteEncounter(){
    this.encounterService.deleteEncounter(this.encounter.pk).subscribe(response => {
      this.router.navigateByUrl("");
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if(this.encounter_subscription) this.encounter_subscription.unsubscribe();
    if(this.connection_subscription) this.connection_subscription.unsubscribe();
    if(this.character_subscription) this.character_subscription.unsubscribe();
  }
}
