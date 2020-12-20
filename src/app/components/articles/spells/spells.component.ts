import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Spell, SpellObject } from 'src/app/models/spell';
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
    private router: Router,
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
      error => Constants.routeToErrorPage(this.router, error)
    );
  }

  panelIsOpen(i: number): boolean{
    return this.panelIsOpenArray[i];
  }

  togglePanel(i: number){
    this.panelIsOpenArray[i] = !this.panelIsOpenArray[i];
  }
}
