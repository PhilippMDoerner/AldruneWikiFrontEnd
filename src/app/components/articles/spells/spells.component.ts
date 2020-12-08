import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Spell, SpellObject } from 'src/app/models/spell';
import { SpellService } from 'src/app/services/spell.service';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class SpellsComponent implements OnInit, OnDestroy {
  panelIsOpenArray: boolean[];
  spells: SpellObject[];
  spell_subscription: Subscription;
  constants: any = Constants;

  constructor(private spellService: SpellService) { }

  ngOnInit(): void {
    this.spell_subscription = this.spellService.getSpells().subscribe((spells: SpellObject[]) => {
      this.spells = spells;
      this.panelIsOpenArray = [];
      for (let spell of spells){
        this.panelIsOpenArray.push(true);
      }
    })
  }

  panelIsOpen(i: number): boolean{
    return this.panelIsOpenArray[i];
  }

  togglePanel(i: number){
    this.panelIsOpenArray[i] = !this.panelIsOpenArray[i];
  }

  ngOnDestroy(){
    if (this.spell_subscription) this.spell_subscription.unsubscribe();
  }
}
