import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "src/app/components/home/home.component";
import { ArticleOverviewComponent } from "src/app/components/articles/article-overview/article-overview.component";
import { CharacterArticleComponent } from "src/app/components/articles/character-article/character-article.component";
import { LocationArticleComponent } from "src/app/components/articles/location-article/location-article.component";
import { DiaryentryArticleComponent } from "src/app/components/articles/diaryentry-article/diaryentry-article.component";
import { CreatureArticleComponent } from "src/app/components/articles/creature-article/creature-article.component";
import { OrganizationArticleComponent } from "src/app/components/articles/organization-article/organization-article.component";
import { ItemArticleComponent } from "src/app/components/articles/item-article/item-article.component";
import { RulesComponent } from "src/app/components/articles/rules/rules.component";
import { CharacterArticleUpdateComponent } from "src/app/components/articles/character-article-update/character-article-update.component";
import { NotFoundComponent } from "src/app/components/not-found/not-found.component";
import { CreatureArticleUpdateComponent } from './components/articles/creature-article-update/creature-article-update.component';
import { DiaryentryArticleUpdateComponent } from './components/articles/diaryentry-article-update/diaryentry-article-update.component';
import { ItemArticleUpdateComponent } from './components/articles/item-article-update/item-article-update.component';
import { LocationArticleUpdateComponent } from './components/articles/location-article-update/location-article-update.component';
import { OrganizationArticleUpdateComponent } from './components/articles/organization-article-update/organization-article-update.component';
import { QuestArticleComponent } from './components/articles/quest-article/quest-article.component';
import { QuestArticleUpdateComponent } from './components/articles/quest-article-update/quest-article-update.component';
import { QuestOverviewComponent } from './components/articles/quest-overview/quest-overview.component';
import { SpellsComponent } from './components/articles/spells/spells.component';
import { RecentlyUpdatedArticleComponent } from './components/articles/recently-updated-article/recently-updated-article.component';
import { SearchComponent } from './components/articles/search/search.component';
import { SessionAudioComponent } from './components/articles/session-audio/session-audio.component';
import { SessionAudioOverviewComponent } from './components/articles/session-audio-overview/session-audio-overview.component';
import { SessionAudioUpdateComponent } from './components/articles/session-audio-update/session-audio-update.component';
import { MarkerComponent } from './components/articles/marker/marker.component';
import { EncounterComponent } from './components/articles/encounter/encounter.component';
import { MarkerUpdateComponent } from './components/articles/marker-update/marker-update.component';
import { MapComponent } from './components/articles/map/map.component';
import { MapUpdateComponent } from './components/articles/map-update/map-update.component';
import { MarkerMapCreateComponent } from './components/articles/marker-map-create/marker-map-create.component';
import { LocationArticleMapCreateComponent } from './components/articles/location-article-map-create/location-article-map-create.component';
import { LoginComponent } from './components/login/login.component';
import { Constants } from './app.constants';

const routes: {path: string, component: any, data: {name: string}}[] = [
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/`, component: HomeComponent, data:{ name: "home1"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}`, component: HomeComponent, data:{ name: "home2"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/login`, component: LoginComponent, data:{ name: "login"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/login/:state`, component: LoginComponent, data:{ name: "login-state"}},
  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character`, component: ArticleOverviewComponent, data:{ name: "character-overview"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/create`, component: CharacterArticleUpdateComponent, data:{ name: "character-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:name`, component: CharacterArticleComponent, data:{ name: "character"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:name/update`, component: CharacterArticleUpdateComponent, data:{ name: "character-update"}},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/encounter/:pk`, component: EncounterComponent, data:{ name: "encounter"}},
  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location`, component: ArticleOverviewComponent, data:{ name: "location-overview"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/create`, component: LocationArticleUpdateComponent, data:{ name: "location-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:parent_name/:name`, component: LocationArticleComponent, data:{ name: "location"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:parent_name/:name/create`, component: LocationArticleUpdateComponent, data:{ name: "location-parentlocation-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:latitude/:longitude/:map_name/create`, component: LocationArticleMapCreateComponent, data:{ name: "location-map-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:parent_name/:name/update`, component: LocationArticleUpdateComponent, data:{ name: "location-update"}},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry`, component: ArticleOverviewComponent, data:{ name: "diaryentry-overview"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/create`, component: DiaryentryArticleUpdateComponent, data:{ name: "diaryentry-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:sessionNumber/:isMainSession/:authorName`, component: DiaryentryArticleComponent, data:{ name: "diaryentry"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:sessionNumber/:isMainSession/:authorName/update`, component: DiaryentryArticleUpdateComponent, data:{ name: "diaryentry-update"}},
  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature`, component: ArticleOverviewComponent, data:{ name: "creature-overview"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/create`, component: CreatureArticleUpdateComponent, data:{ name: "creature-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:name`, component: CreatureArticleComponent, data:{ name: "creature"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:name/update`, component: CreatureArticleUpdateComponent, data:{ name: "creature-update"}},
  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization`, component: ArticleOverviewComponent, data:{ name: "organization-overview"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/create`, component: OrganizationArticleUpdateComponent, data:{ name: "organization-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:name`, component: OrganizationArticleComponent, data:{ name: "organization"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:name/update`, component: OrganizationArticleUpdateComponent, data:{ name: "organization-update"}},
  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item`, component: ArticleOverviewComponent, data:{ name: "item-overview"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/create`, component: ItemArticleUpdateComponent, data:{ name: "item-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:character_name/create`, component: ItemArticleUpdateComponent, data:{ name: "item-character-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:name`, component: ItemArticleComponent, data:{ name: "item"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:name/update`, component: ItemArticleUpdateComponent, data:{ name: "item-update"}},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest`, component: QuestOverviewComponent, data:{ name: "quest-overview"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/create`, component: QuestArticleUpdateComponent, data:{ name: "quest-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:name`, component: QuestArticleComponent, data:{ name: "quest"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:name/update`, component: QuestArticleUpdateComponent, data:{ name: "quest-update"}},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio`, component: SessionAudioOverviewComponent, data:{ name: "sessionaudio-overview"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/create`, component: SessionAudioUpdateComponent, data:{ name: "sessionaudio-create"}},  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:isMainSession/:sessionNumber`, component: SessionAudioComponent, data:{ name: "sessionaudio"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:isMainSession/:sessionNumber/update`, component: SessionAudioUpdateComponent, data:{ name: "sessionaudio-update"}},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:parent_location_name/:location_name/create`, component: MarkerUpdateComponent, data:{ name: "marker-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:latitude/:longitude/:map_name/create`, component: MarkerMapCreateComponent, data:{ name: "marker-map-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:parent_location_name/:location_name/:map_name`, component: MarkerComponent, data:{ name: "marker"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:parent_location_name/:location_name/:map_name/update`, component: MarkerUpdateComponent, data:{ name: "marker-update"}},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/create`, component: MapUpdateComponent, data:{ name: "map-create"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:name`, component: MapComponent, data:{ name: "map"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:name/update`, component: MapUpdateComponent, data:{ name: "map-update"}},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/rules`, component: RulesComponent, data:{ name: "rules"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/spells`, component: SpellsComponent, data:{ name: "spells"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/recent-updates`, component: RecentlyUpdatedArticleComponent, data:{ name: "recent-updates"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/search/:searchString`, component: SearchComponent, data:{ name: "search"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/error`, component: NotFoundComponent, data:{ name: "error"}},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/**`, component: NotFoundComponent, data:{ name: "not-found"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
