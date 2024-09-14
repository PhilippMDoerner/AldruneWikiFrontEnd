import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants, OverviewType } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { OverviewItemObject } from 'src/app/models/overviewItem';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

interface OverviewMetaData {
  image: string;
  heading: string;
  processing: (listItems: OverviewItemObject[]) => OverviewItemObject[];
  overviewTypeEnum: OverviewType;
}
interface OverviewMetaDataMap {
  [key: string]: OverviewMetaData;
}

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.scss'],
})
export class ArticleOverviewComponent
  extends PermissionUtilityFunctionMixin
  implements OnInit, AfterViewInit
{
  OverviewType = OverviewType;

  //URLS
  homeUrl: string;

  diaryentryNames: string[];

  //OTHER VARIABLES
  listItems: OverviewItemObject[];
  playerCharacters: OverviewItemObject[];
  isInitialAnimationFinished: boolean = false;
  campaign: CampaignOverview;

  @ViewChildren('filter') filterField: QueryList<ElementRef>;
  @ViewChild('overviewMainCard') articleElement: ElementRef;

  constants: any = Constants;
  overviewTypeMetaData: OverviewMetaDataMap = {
    character: {
      image: `/assets/overview_images/characters.webp`,
      heading: 'Characters',
      processing: (listItems: OverviewItemObject[]) =>
        this.processCharacterOverviewItems(listItems),
      overviewTypeEnum: OverviewType.Character,
    },
    creature: {
      image: `/assets/overview_images/creatures.webp`,
      heading: 'Creatures',
      processing: null,
      overviewTypeEnum: OverviewType.Creature,
    },
    diaryentry: {
      image: `/assets/overview_images/diaryentries.webp`,
      heading: 'Diaryentries',
      processing: (listItems: OverviewItemObject[]) =>
        this.processDiaryentryOverviewItems(listItems),
      overviewTypeEnum: OverviewType.Diaryentry,
    },
    item: {
      image: `/assets/overview_images/items.webp`,
      heading: 'Items',
      processing: null,
      overviewTypeEnum: OverviewType.Item,
    },
    location: {
      image: `/assets/overview_images/locations.webp`,
      heading: 'Locations',
      processing: (listItems: OverviewItemObject[]) =>
        this.processLocationOverviewItems(listItems),
      overviewTypeEnum: OverviewType.Location,
    },
    organization: {
      image: `/assets/overview_images/organizations.webp`,
      heading: 'Organizations',
      processing: null,
      overviewTypeEnum: OverviewType.Organization,
    },
  };

  overviewTypeName: string;

  characterOverview: string = 'character';
  itemOverview: string = 'item';
  creatureOverview: string = 'creature';
  locationOverview: string = 'location';
  organizationOverview: string = 'organization';
  diaryentryOverview: string = 'diaryentry';

  constructor(
    private router: Router,
    public routingService: RoutingService,
    route: ActivatedRoute,
    tokenService: TokenService
  ) {
    super(tokenService, route);
  }

  ngOnInit(): void {
    this.campaign = this.route.snapshot.data['campaign'];

    const listItems: OverviewItemObject[] =
      this.route.snapshot.data['overviewList'];
    const configs = this.getOverviewConfigs();
    const processingFunction = configs.processing;
    const hasProcessingFunction = processingFunction != null;
    this.listItems = hasProcessingFunction
      ? processingFunction(listItems)
      : listItems;

    this.setRouterLinks(this.campaign, this.listItems);
  }

  setRouterLinks(
    campaign: CampaignOverview,
    listItems: OverviewItemObject[]
  ): void {
    this.homeUrl = this.routingService.getRoutePath('home2', {
      campaign: campaign.name,
    });
  }

  getOverviewConfigs(): OverviewMetaData {
    const urlSplit: string[] = this.router.url.split('/');
    this.overviewTypeName = urlSplit[urlSplit.length - 2];
    const configs: OverviewMetaData =
      this.overviewTypeMetaData[this.overviewTypeName];
    return configs;
  }

  ngAfterViewInit(): void {
    if (!this.articleElement?.nativeElement) return;

    animateElement(this.articleElement.nativeElement, 'fadeIn');
    this.focusFilterField();
  }

  //This function exists only so that it triggers the NgClass of the listItems in the template
  filterListItems() {}

  openFirstArticle(filterValue: string) {
    const filterValueLower: string = filterValue.toLowerCase();

    const filteredListItems: OverviewItemObject[] = this.listItems.filter(
      (item: OverviewItemObject) =>
        item.name.toLowerCase().includes(filterValueLower)
    );

    const firstFilteredListItem = filteredListItems[0];
    this.routingService.routeToApiObject(firstFilteredListItem);
  }

  processCharacterOverviewItems(
    characterListItems: OverviewItemObject[]
  ): OverviewItemObject[] {
    const playerCharacters: OverviewItemObject[] = [];
    const nonPlayerCharacters: OverviewItemObject[] = [];

    characterListItems.forEach((item: OverviewItemObject) =>
      item.player_character
        ? playerCharacters.push(item)
        : nonPlayerCharacters.push(item)
    );

    this.playerCharacters = playerCharacters;

    return nonPlayerCharacters;
  }

  processDiaryentryOverviewItems(
    diaryentryListItems: OverviewItemObject[]
  ): OverviewItemObject[] {
    diaryentryListItems.forEach(
      (item: OverviewItemObject) =>
        (item.name_full = this.buildDiaryEntryNameForList(item))
    );
    return diaryentryListItems;
  }

  /**
   * @description Generates the full name of a location based on its path in the location tree, concatenating
   * any parent name at the start.
   * @param {this} context - This component, needed to grant access despite the function being assigned to an object.
   */
  processLocationOverviewItems(
    locationItems: OverviewItemObject[]
  ): OverviewItemObject[] {
    locationItems.forEach((location: OverviewItemObject) => {
      const parents: OverviewItemObject[] = this.getParentLocations(
        location,
        locationItems
      );
      const parentNames: string[] = parents
        .map((location: OverviewItemObject) => location.name)
        .reverse();
      const locationPath: string = parentNames.join(' - ');

      location.name_full = locationPath;
    });

    this.sortLocationsByNameFull(locationItems);
    return locationItems;
  }

  getParentLocations(
    location: OverviewItemObject,
    listItems: OverviewItemObject[]
  ): OverviewItemObject[] {
    const parents: OverviewItemObject[] = [location];

    var currentLocation: OverviewItemObject = location;

    while (currentLocation.parent_location_details.pk != null) {
      // aka hasParentLocation
      const parentLocationPk: number =
        currentLocation.parent_location_details.pk;
      const parentLocation: OverviewItemObject = this.getListItemByPk(
        parentLocationPk,
        listItems
      );
      parents.push(parentLocation);

      currentLocation = parentLocation;
    }

    return parents;
  }

  getListItemByPk(
    pk: number,
    listItems: OverviewItemObject[]
  ): OverviewItemObject {
    if (pk == null) return null;

    const targetItem: OverviewItemObject = listItems.find(
      (item: OverviewItemObject) => item.pk === pk
    );
    return targetItem;
  }

  sortLocationsByNameFull(locations: OverviewItemObject[]) {
    locations.sort((loc1: OverviewItemObject, loc2: OverviewItemObject) =>
      loc1.name_full > loc2.name_full ? 1 : -1
    );
  }

  buildDiaryEntryNameForList(diaryEntry: OverviewItemObject): string {
    const startWithSessionNumber: string = `#${diaryEntry.session_details.session_number}`;
    let title: string = diaryEntry.name != null ? `- ${diaryEntry.name}` : '';

    if (Constants.isSmallScreen) return `${startWithSessionNumber} ${title}`;

    let daysCoveredByEntry: string = '';
    if (
      diaryEntry.session_details.start_day != null &&
      diaryEntry.session_details.end_day != null
    ) {
      const padLength: number = 3;
      const startDay: string = this.padNumber(
        diaryEntry.session_details.start_day,
        padLength,
        ''
      );
      const endDay: string = this.padNumber(
        diaryEntry.session_details.end_day,
        padLength,
        ''
      );
      daysCoveredByEntry = `- Days ${startDay}-${endDay}`;
    }

    return `${startWithSessionNumber} ${daysCoveredByEntry} ${title}`;
  }

  padNumber(num: number, padCount: number, paddingCharacter = '0'): string {
    const overlengthString: string = paddingCharacter.repeat(padCount) + num;
    return overlengthString.slice(padCount * -1);
  }

  private focusFilterField() {
    this.filterField.first.nativeElement.focus();
  }
}
