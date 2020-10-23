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

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "character", component: ArticleOverviewComponent},
  {path: "character/create", component: CharacterArticleUpdateComponent},
  {path: "character/:name", component: CharacterArticleComponent},
  {path: "character/:name/update", component: CharacterArticleUpdateComponent},
  
  {path: "location", component: ArticleOverviewComponent},
  {path: "location/", component: LocationArticleComponent},

  {path: "diaryentry", component: ArticleOverviewComponent},
  {path: "diaryentry/", component: DiaryentryArticleComponent},
  
  
  {path: "creature", component: ArticleOverviewComponent},
  {path: "creature/", component: CreatureArticleComponent},
  
  {path: "organization", component: ArticleOverviewComponent},
  {path: "organization/", component: OrganizationArticleComponent},
  
  {path: "item", component: ArticleOverviewComponent},
  {path: "item/", component: ItemArticleComponent},
  
  {path: "rules", component: RulesComponent},
  {path: "error", component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
