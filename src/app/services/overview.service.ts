import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverviewItem, OverviewItemObject } from "src/app/models/overviewItem";
import { Constants, OverviewType } from '../app.constants';
import { transformObservableArrayContent } from '../utils/functions/transform';
import { CharacterService } from './character/character.service';
import { CreatureService } from './creature/creature.service';
import { DiaryentryService } from './diaryentry/diaryentry.service';
import { EncounterServiceService } from './encounter/encounter-service.service';
import { GenericObjectService } from './generic-object.service';
import { GenericService } from './generic.service';
import { ItemService } from './item/item.service';
import { LocationService } from './location/location.service';
import { MapService } from './map.service';
import { MarkerTypeService } from './marker-type.service';
import { MarkerService } from './marker.service';
import { OrganizationService } from './organization/organization.service';
import { QuestService } from './quest.service';
import { QuoteService } from './quote.service';
import { RuleService } from './rule.service';
import { SessionAudioService } from './session-audio.service';
import { SessionService } from './session.service';
import { SpellService } from './spell.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  overviewUrl: string = `${Constants.wikiApiUrl}`;

  
  overviewServiceMapping: {[type in OverviewType]: GenericObjectService | GenericService} = {
    [OverviewType.Character] : this.characterService,
    [OverviewType.Creature] : this.creatureService,
    [OverviewType.Diaryentry] : this.diaryentryService,
    [OverviewType.Encounter] : this.encounterService,
    [OverviewType.Item] : this.itemService,
    [OverviewType.Location] : this.locationService,
    [OverviewType.Map] : this.mapService,
    [OverviewType.MarkerType] : this.markerService,
    [OverviewType.MarkerTypeType] : this.markerTypeService,    
    [OverviewType.Organization]: this.organizationService,
    [OverviewType.Quest] : this.questService,
    [OverviewType.Quote] : this.quoteService,
    [OverviewType.Rule] : this.ruleService,
    [OverviewType.Session] : this.sessionService,
    [OverviewType.Sessionaudio] : this.sessionaudioService,
    [OverviewType.Spell] : this.spellService,
    [OverviewType.User] : this.userService,
  }

  constructor(
    private characterService: CharacterService,
    private creatureService: CreatureService,
    private diaryentryService: DiaryentryService,
    private encounterService: EncounterServiceService,
    private itemService: ItemService,
    private locationService: LocationService,
    private mapService: MapService,
    private markerService: MarkerService,
    private markerTypeService: MarkerTypeService,
    private organizationService: OrganizationService,
    private questService: QuestService,
    private ruleService: RuleService,
    private sessionService: SessionService,
    private sessionaudioService: SessionAudioService,
    private spellService: SpellService,
    private quoteService: QuoteService,
    private userService: UserService
  ) { }

  getCampaignOverviewItems(campaign: string, overviewType: OverviewType, sortProperty?: string): Observable<OverviewItemObject[]>{
    const targetService: GenericObjectService | GenericService = this.overviewServiceMapping[overviewType];
    let overviewItemObservable: Observable<OverviewItem[]> = targetService.campaignList(campaign);

    if(sortProperty != null){      
      overviewItemObservable = overviewItemObservable.pipe(
        map((items: OverviewItem[]) => this.sortByProperty(items, sortProperty))
      );
    }

    return transformObservableArrayContent(overviewItemObservable, OverviewItemObject);
  }

  getAllOverviewItems(overviewType: OverviewType, sortProperty?: string): Observable<OverviewItemObject[]>{
    const targetService: GenericObjectService | GenericService = this.overviewServiceMapping[overviewType];
    let overviewItemObservable: Observable<OverviewItem[]> = targetService.list();

    if(sortProperty == null){
      return transformObservableArrayContent(overviewItemObservable, OverviewItemObject);
    }
    
    overviewItemObservable = overviewItemObservable.pipe(
      map((items: OverviewItem[]) => this.sortByProperty(items, sortProperty))
    );
    
    return transformObservableArrayContent(overviewItemObservable, OverviewItemObject);
  }
  
  private sortByProperty(list: any[], propertyName: string): any[] {
    const isInverseSort = propertyName.startsWith("-");
    if(isInverseSort){
      propertyName = this.removeInversionPrefix(propertyName);
    }
    
    const sortFunction = (item1:OverviewItem, item2: OverviewItem) => {
      const isStringSortVal = typeof item1[propertyName] === "string"; 
      const item1SortVal = isStringSortVal ?
        item1[propertyName].toLowerCase() :
        item1[propertyName];
      const item2SortVal = isStringSortVal ?
        item2[propertyName].toLowerCase() :
        item2[propertyName];
      
      let inCorrectOrder = item1SortVal < item2SortVal;
      if(isInverseSort){
        inCorrectOrder = !inCorrectOrder;
      }
      
      return inCorrectOrder ? -1 : 1;
    };
    
    return list.sort(sortFunction);
  };
  
  
  private removeInversionPrefix(str: string): string{
    return str.substring(1);
  }
}
