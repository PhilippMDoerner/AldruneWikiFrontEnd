import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from "@angular/forms";
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from "@angular/common";

import { AppComponent } from './app.component';
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { HomeComponent } from './components/home/home.component';
import { CharacterArticleComponent } from './components/articles/character-article/character-article.component';
import { LocationArticleComponent } from './components/articles/location-article/location-article.component';
import { OrganizationArticleComponent } from './components/articles/organization-article/organization-article.component';
import { DiaryentryArticleComponent } from './components/articles/diaryentry-article/diaryentry-article.component';
import { CreatureArticleComponent } from './components/articles/creature-article/creature-article.component';
import { ItemArticleComponent } from './components/articles/item-article/item-article.component';
import { RulesComponent } from './components/articles/rules/rules.component';
import { ArticleOverviewComponent } from './components/articles/article-overview/article-overview.component';
import { TextfieldComponent } from './components/utility/textfield/textfield.component';
import { ImageGalleryComponent } from './components/utility/image-gallery/image-gallery.component';

import { CharacterService } from "src/app/services/character/character.service";
import { EncounterAccordionComponent } from './components/utility/encounter-accordion/encounter-accordion.component';
import { CharacterArticleUpdateComponent } from './components/articles/character-article-update/character-article-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CharacterArticleComponent,
    LocationArticleComponent,
    OrganizationArticleComponent,
    DiaryentryArticleComponent,
    CreatureArticleComponent,
    ItemArticleComponent,
    RulesComponent,
    ArticleOverviewComponent,
    TextfieldComponent,
    ImageGalleryComponent,
    EncounterAccordionComponent,
    CharacterArticleUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    CharacterService,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    EncounterAccordionComponent
  ]
})
export class AppModule { }
