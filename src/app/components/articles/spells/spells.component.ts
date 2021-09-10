import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { SpellObject, SpellPlayerClassConnection } from 'src/app/models/spell';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { SpellService } from 'src/app/services/spell.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleListMixin } from 'src/app/utils/functions/articleListMixin';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.scss']
})
export class SpellsComponent extends ArticleListMixin implements OnInit, AfterViewInit, OnDestroy {
  articleModelClass = SpellObject;
  articleStarterTitle = "New Spell";

  selectedClasses: String[] = []; 

  @ViewChildren("spellElements") spellComponents: QueryList<any>;

  constructor(
    spellService: SpellService,
    routingService: RoutingService,
    public tokenService: TokenService,
    route: ActivatedRoute,
    warning: WarningsService,
    globalUrlParams: GlobalUrlParamsService
  ) { 
    super(
      spellService,
      route,
      routingService,
      warning,
      globalUrlParams
    )
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
}
