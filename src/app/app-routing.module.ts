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

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "character", component: ArticleOverviewComponent},
  {path: "character/create", component: CharacterArticleUpdateComponent},
  {path: "character/:name", component: CharacterArticleComponent},
  {path: "character/:name/update", component: CharacterArticleUpdateComponent},

  {path: "encounter/:pk", component: EncounterComponent},
  
  {path: "location", component: ArticleOverviewComponent},
  {path: "location/create", component: LocationArticleUpdateComponent},
  {path: "location/:parent_name/:name", component: LocationArticleComponent},
  {path: "location/:parent_name/:name/create", component: LocationArticleUpdateComponent},
  {path: "location/:latitude/:longitude/:map_name/create", component: LocationArticleMapCreateComponent},
  {path: "location/:parent_name/:name/update", component: LocationArticleUpdateComponent},

  {path: "diaryentry", component: ArticleOverviewComponent},
  {path: "diaryentry/create", component: DiaryentryArticleUpdateComponent},
  {path: "diaryentry/:sessionNumber/:isMainSession/:authorName", component: DiaryentryArticleComponent},
  {path: "diaryentry/:sessionNumber/:isMainSession/:authorName/update", component: DiaryentryArticleUpdateComponent},
  
  {path: "creature", component: ArticleOverviewComponent},
  {path: "creature/create", component: CreatureArticleUpdateComponent},
  {path: "creature/:name", component: CreatureArticleComponent},
  {path: "creature/:name/update", component: CreatureArticleUpdateComponent},
  
  {path: "organization", component: ArticleOverviewComponent},
  {path: "organization/create", component: OrganizationArticleUpdateComponent},
  {path: "organization/:name", component: OrganizationArticleComponent},
  {path: "organization/:name/update", component: OrganizationArticleUpdateComponent},
  
  {path: "item", component: ArticleOverviewComponent},
  {path: "item/create", component: ItemArticleUpdateComponent},
  {path: "item/:character_name/create", component: ItemArticleUpdateComponent},
  {path: "item/:name", component: ItemArticleComponent},
  {path: "item/:name/update", component: ItemArticleUpdateComponent},

  {path: "quest", component: QuestOverviewComponent},
  {path: "quest/create", component: QuestArticleUpdateComponent},
  {path: "quest/:name", component: QuestArticleComponent},
  {path: "quest/:name/update", component: QuestArticleUpdateComponent},

  {path: "sessionaudio", component: SessionAudioOverviewComponent},
  {path: "sessionaudio/create", component: SessionAudioUpdateComponent},  
  {path: "sessionaudio/:isMainSession/:sessionNumber", component: SessionAudioComponent},
  {path: "sessionaudio/:isMainSession/:sessionNumber/update", component: SessionAudioUpdateComponent},

  {path:  "marker/:parent_location_name/:location_name/create", component: MarkerUpdateComponent},
  {path:  "marker/:latitude/:longitude/:map/create", component: MarkerMapCreateComponent},
  {path:  "marker/:parent_location_name/:location_name/:map_name", component: MarkerComponent},
  {path:  "marker/:parent_location_name/:location_name/:map_name/update", component: MarkerUpdateComponent},

  {path: "map/create", component: MapUpdateComponent},
  {path: "map/:name", component: MapComponent},
  {path: "map/:name/update", component: MapUpdateComponent},


  {path: "rules", component: RulesComponent},
  {path: "spells", component: SpellsComponent},
  {path: "recent-updates", component: RecentlyUpdatedArticleComponent},
  {path: "search/:searchString", component: SearchComponent},
  {path: "error", component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
