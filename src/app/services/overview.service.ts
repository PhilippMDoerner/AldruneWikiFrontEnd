import { Injectable } from '@angular/core';
import { Constants, OverviewType } from '../app.constants';
import { OverviewItem, OverviewItemObject } from "src/app/models/overviewItem";
import { Observable } from 'rxjs';
import { TransformArrayObservable } from '../utils/functions/transform';
import { CharacterService } from './character/character.service';
import { CreatureService } from './creature/creature.service';
import { DiaryentryService } from './diaryentry/diaryentry.service';
import { EncounterServiceService } from './encounter/encounter-service.service';
import { ItemService } from './item/item.service';
import { LocationService } from './location/location.service';
import { MapService } from './map.service';
import { QuestService } from './quest.service';
import { SpellService } from './spell.service';
import { RuleService } from './rule.service';
import { SessionService } from './session.service';
import { SessionAudioService } from './session-audio.service';
import { QuoteService } from './quote.service';
import { GenericObjectService } from './generic-object.service';
import { GenericService } from './generic.service';
import { OrganizationService } from './organization/organization.service';
import { UserService } from './user.service';
import { MarkerService } from './marker.service';
import { MarkerTypeService } from './marker-type.service';


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

  @TransformArrayObservable(OverviewItemObject)
  getOverviewItems(campaign: string, overviewType: OverviewType): Observable<OverviewItem[]>{
    const targetService: GenericObjectService | GenericService = this.overviewServiceMapping[overviewType];
    return targetService.campaignList(campaign);
  }
}
