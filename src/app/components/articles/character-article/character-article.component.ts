import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterObject } from "src/app/models/character";
import { CharacterService } from "src/app/services/character/character.service";
import { Subject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Constants } from "src/app/app.constants";
import { first } from 'rxjs/operators';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';
import { QuoteObject } from 'src/app/models/quote';
import { QuoteService } from 'src/app/services/quote.service';
@Component({
  selector: 'app-character-article',
  templateUrl: './character-article.component.html',
  styleUrls: ['./character-article.component.scss']
})

export class CharacterArticleComponent extends PermissionUtilityFunctionMixin implements OnInit, OnDestroy {
  constants: any = Constants;
  character: CharacterObject;
  confirmationModal: Subject<void> = new Subject<void>();
  articleType: string = 'character';

  quote: QuoteObject;
  quoteCreateState: boolean = false;

  private parameter_subscription: Subscription;

  constructor(
    private characterService: CharacterService,
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private warnings: WarningsService,  
    public routingService: RoutingService,
    ) { super() }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe( params => {
      const characterName: string = params.name;
      this.characterService.getCharacter(characterName).pipe(first()).subscribe(
        (character: CharacterObject) => this.character = character, 
        error => this.routingService.routeToErrorPage(error)
      );

    });
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.character.description;
    this.character.description = updatedDescription;
    this.characterService.updateCharacter(this.character).pipe(first()).subscribe(
      (character: CharacterObject) => {},
      error =>{
        this.character.description = oldDescription;
        this.warnings.showWarning(error);
      }
    );
  }

  deleteArticle(){
      this.characterService.deleteCharacter(this.character).pipe(first()).subscribe(
        response => this.routingService.routeToPath('character-overview'),
        error => this.warnings.showWarning(error)
      )
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
