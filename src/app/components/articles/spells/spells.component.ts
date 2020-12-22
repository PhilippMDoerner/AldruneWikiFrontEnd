import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { SpellObject } from 'src/app/models/spell';
import { RoutingService } from 'src/app/services/routing.service';
import { SpellService } from 'src/app/services/spell.service';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class SpellsComponent implements OnInit {
  panelIsOpenArray: boolean[];
  spells: SpellObject[];
  constants: any = Constants;

  constructor(
    private spellService: SpellService,
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.spellService.getSpells().pipe(first()).subscribe(
      (spells: SpellObject[]) => {
        this.spells = spells;
        this.panelIsOpenArray = [];
        for (let spell of spells){
          this.panelIsOpenArray.push(true);
        };
      },
      error => this.routingService.routeToErrorPage(error)
    );
  }

  panelIsOpen(i: number): boolean{
    return this.panelIsOpenArray[i];
  }

  togglePanel(i: number){
    this.panelIsOpenArray[i] = !this.panelIsOpenArray[i];
  }
}
