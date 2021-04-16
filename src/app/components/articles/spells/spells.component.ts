import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { PlayerClass, PlayerClassObject } from 'src/app/models/playerclass';
import { SpellObject, SpellPlayerClassConnection } from 'src/app/models/spell';
import { RoutingService } from 'src/app/services/routing.service';
import { SpellService } from 'src/app/services/spell.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class SpellsComponent implements OnInit {
  panelIsOpenArray: boolean[];
  spells: SpellObject[];
  constants: any = Constants;

  selectedClasses: String[] = []; 

  constructor(
    private spellService: SpellService,
    public routingService: RoutingService,
    public tokenService: TokenService,
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

  addSpell(){
    const newSpell = new SpellObject();
    newSpell.name = "New Spell";
    this.spells.push(newSpell);
  }

  selectClass(className: String){
    const isAlreadySelected = this.selectedClasses.includes(className);
    if (!isAlreadySelected){
      this.selectedClasses.push(className);
    }
  }

  hasSelectedClasses(spell: SpellObject){
    if(this.selectedClasses.length === 0) return true; //If no classes are selected, all spells should be shown

    const playerClasses : SpellPlayerClassConnection[] = spell.player_class_connections;
    const hasClass = playerClasses.some((connection: SpellPlayerClassConnection) => (this.selectedClasses.includes(connection.player_class_details.name)));
    return hasClass;
  }

  onSpellDelete(index: number){
    this.spells.splice(index, 1);
  }
}
