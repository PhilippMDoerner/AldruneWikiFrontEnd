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

const routes: Routes = [
  {path: ``, component: HomeComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}`, component: HomeComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/login`, component: LoginComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/login/:state`, component: LoginComponent},
  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character`, component: ArticleOverviewComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/create`, component: CharacterArticleUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:name`, component: CharacterArticleComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:name/update`, component: CharacterArticleUpdateComponent},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/encounter/:pk`, component: EncounterComponent},
  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location`, component: ArticleOverviewComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/create`, component: LocationArticleUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:parent_name/:name`, component: LocationArticleComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:parent_name/:name/create`, component: LocationArticleUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:latitude/:longitude/:map_name/create`, component: LocationArticleMapCreateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:parent_name/:name/update`, component: LocationArticleUpdateComponent},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry`, component: ArticleOverviewComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/create`, component: DiaryentryArticleUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:sessionNumber/:isMainSession/:authorName`, component: DiaryentryArticleComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:sessionNumber/:isMainSession/:authorName/update`, component: DiaryentryArticleUpdateComponent},
  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature`, component: ArticleOverviewComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/create`, component: CreatureArticleUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:name`, component: CreatureArticleComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:name/update`, component: CreatureArticleUpdateComponent},
  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization`, component: ArticleOverviewComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/create`, component: OrganizationArticleUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:name`, component: OrganizationArticleComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:name/update`, component: OrganizationArticleUpdateComponent},
  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item`, component: ArticleOverviewComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/create`, component: ItemArticleUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:character_name/create`, component: ItemArticleUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:name`, component: ItemArticleComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:name/update`, component: ItemArticleUpdateComponent},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest`, component: QuestOverviewComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/create`, component: QuestArticleUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:name`, component: QuestArticleComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:name/update`, component: QuestArticleUpdateComponent},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio`, component: SessionAudioOverviewComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/create`, component: SessionAudioUpdateComponent},  
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:isMainSession/:sessionNumber`, component: SessionAudioComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:isMainSession/:sessionNumber/update`, component: SessionAudioUpdateComponent},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:parent_location_name/:location_name/create`, component: MarkerUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:latitude/:longitude/:map_name/create`, component: MarkerMapCreateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:parent_location_name/:location_name/:map_name`, component: MarkerComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:parent_location_name/:location_name/:map_name/update`, component: MarkerUpdateComponent},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/create`, component: MapUpdateComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:name`, component: MapComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:name/update`, component: MapUpdateComponent},

  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/rules`, component: RulesComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/spells`, component: SpellsComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/recent-updates`, component: RecentlyUpdatedArticleComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/search/:searchString`, component: SearchComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/error`, component: NotFoundComponent},
  {path: `${Constants.wikiUrlFrontendPrefixNoSlash}/**`, component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
