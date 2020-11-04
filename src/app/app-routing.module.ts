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

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "character", component: ArticleOverviewComponent},
  {path: "character/create", component: CharacterArticleUpdateComponent},
  {path: "character/:name", component: CharacterArticleComponent},
  {path: "character/:name/update", component: CharacterArticleUpdateComponent},
  
  {path: "location", component: ArticleOverviewComponent},
  {path: "location/create", component: LocationArticleUpdateComponent},
  {path: "location/:parent_name/:name", component: LocationArticleComponent},
  {path: "location/:parent_name/:name/create", component: LocationArticleUpdateComponent},
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

  {path: "rules", component: RulesComponent},
  {path: "error", component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
