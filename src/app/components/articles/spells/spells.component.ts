import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { SpellObject, SpellPlayerClassConnection } from 'src/app/models/spell';
import { RoutingService } from 'src/app/services/routing.service';
import { SpellService } from 'src/app/services/spell.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class SpellsComponent implements OnInit, AfterViewInit {
  panelIsOpenArray: boolean[];
  spells: SpellObject[];
  constants: any = Constants;

  selectedClasses: String[] = []; 

  @ViewChildren("spellElements") spellComponents: QueryList<any>;

  constructor(
    private spellService: SpellService,
    public routingService: RoutingService,
    public tokenService: TokenService,
    private route: ActivatedRoute  
  ) { }

  ngOnInit(): void {
    this.spellService.list().pipe(first()).subscribe(
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

  ngAfterViewInit(): void{
    const urlSpellName: string = this.route.snapshot.params["name"];

    this.spellComponents.changes.subscribe( 
      (queryList: QueryList<any>) => this.scrollToSpellInQueryList(queryList, urlSpellName)
    );
  }

  scrollToSpellInQueryList(queryList: QueryList<any>, spellName: string){
    const targetSpellComponent = queryList.find( spellComponent => spellComponent.cardData.name === spellName );
    const hasTargetSpell = targetSpellComponent != null;

    if(hasTargetSpell){
      targetSpellComponent.element.nativeElement.scrollIntoView();
    }
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
