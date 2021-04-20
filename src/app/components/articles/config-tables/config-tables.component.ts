import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { MarkerTypeService } from 'src/app/services/marker-type.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { PlayerClassService } from 'src/app/services/player-class.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-config-tables',
  templateUrl: './config-tables.component.html',
  styleUrls: ['./config-tables.component.scss']
})
export class ConfigTablesComponent implements OnInit {
  tables = [
    {
      name: "Marker Type",
      entries: [],
      icon: "tag",
      service: this.markerTypeService,
      model: {name: null, is_text_marker: false, icon: null, color: null},
      formFields: [
        this.formlyService.genericInput({key: "name"}),
        this.formlyService.genericCheckbox({key: "is_text_marker", label: "Show name instead of Icon", defaultValue: false}),
        this.formlyService.genericInput({key: "icon"}),
        this.formlyService.genericInput({key: "color"})
      ]
    },
    {
      name: "Class",
      entries: [],
      icon: "user",
      service: this.playerClassService,
      model: {name: null},
      formFields: [
        this.formlyService.genericInput({key: "name"})
      ]
    }
  ];

  createStateArray: boolean[] = [];
  modelBackup: any[] = [];

  constructor(
    private formlyService: MyFormlyService,
    private markerTypeService: MarkerTypeService,
    private playerClassService: PlayerClassService,
    private warnings: WarningsService,
  ) { }

  ngOnInit(): void {
    // Create model copies to be able to reset models later on
    for(let table of this.tables){
      const modelCopy: object = Object.assign({}, table.model);
      this.modelBackup.push(modelCopy);
      this.createStateArray.push(false);
    }
  }

  resetModel(index: number){
    const cleanModel = this.modelBackup[index];
    const cleanModelCopy = Object.assign({}, cleanModel);
    this.tables[index].model = cleanModelCopy;
  }

  loadTableEntries(tableIndex: number){
    const table = this.tables[tableIndex];
    const obs: Observable<any> = table.service.list()
    obs.pipe(first()).subscribe(
      (entries: any[]) => table.entries = entries.sort((a, b) => {
        if (a.id != null && b.id != null) return a.id - b.id;
        if (a.pk != null && b.pk != null) return a.pk - b.pk;
      }),
      error => this.warnings.showWarning(error)
    );
  }

  createNewTableEntry(tableIndex: number){
    const table = this.tables[tableIndex];
    const model: any = table.model;
    table.service.create(model).pipe(first()).subscribe(
      (newEntry: any) => {
        table.entries.push(newEntry);
        this.createStateArray[tableIndex] = false;
      },
      (error) => this.warnings.showWarning(error)
    );
  }

  //TODO: Implement a generic way to check if a given entry is being used by any other table as a foreign key
  //TODO: Either figure out how to query that or 
  deleteTableEntry(tableIndex: number, entryIndex: number){
    const table = this.tables[tableIndex];
    const entry = table.entries[entryIndex];
    const entryPk = (entry.pk == null) ? entry.id : entry.pk;

    table.service.delete(entryPk).pipe(first()).subscribe(
      (response) => table.entries.splice(entryIndex, 1),
      (error) => this.warnings.showWarning(error)
    )
  }

}
