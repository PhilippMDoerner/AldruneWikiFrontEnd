import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { EncounterAccordionComponent } from './components/utility/encounter-accordion/encounter-accordion.component';
import { CharacterArticleUpdateComponent } from './components/articles/character-article-update/character-article-update.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SpinnerComponent } from './components/utility/spinner/spinner.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { FormlyFieldFile } from './components/utility/file-upload/file-upload.component';
import { FileValueAccessor } from './components/utility/file-upload/file-value-accesor';

import { GroupByPipe, GroupByFirstLetterPipe } from "src/app/utils/pipes/groupObjects.pipe";
import { CreatureArticleUpdateComponent } from './components/articles/creature-article-update/creature-article-update.component';
import { DiaryentryArticleUpdateComponent } from './components/articles/diaryentry-article-update/diaryentry-article-update.component';
import { ItemArticleUpdateComponent } from './components/articles/item-article-update/item-article-update.component';
import { LocationArticleUpdateComponent } from './components/articles/location-article-update/location-article-update.component';
import { LocationAccordionComponent } from './components/utility/location-accordion/location-accordion.component';
import { OrganizationArticleUpdateComponent } from './components/articles/organization-article-update/organization-article-update.component';
import { FormlyComponent } from './components/utility/formly/formly.component';
import { QuestArticleComponent } from './components/articles/quest-article/quest-article.component';
import { QuestArticleUpdateComponent } from './components/articles/quest-article-update/quest-article-update.component';
import { QuestOverviewComponent } from './components/articles/quest-overview/quest-overview.component';
import { SpellsComponent } from './components/articles/spells/spells.component';
import { RecentlyUpdatedArticleComponent } from './components/articles/recently-updated-article/recently-updated-article.component';
import { DeleteToggleComponent } from './components/utility/delete-toggle/delete-toggle.component';
import { EditToggleComponent } from './components/utility/edit-toggle/edit-toggle.component';
import { ColoredSidebarLegendComponent } from './components/utility/colored-sidebar-legend/colored-sidebar-legend.component';
import { ObjectListComponent } from './components/utility/object-list/object-list.component';
import { SearchComponent } from './components/articles/search/search.component';
import { SessionAudioComponent } from './components/articles/session-audio/session-audio.component';
import { SessionAudioOverviewComponent } from './components/articles/session-audio-overview/session-audio-overview.component';

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
    NotFoundComponent,
    SpinnerComponent,
    FormlyFieldFile,
    FileValueAccessor,
    GroupByPipe,
    GroupByFirstLetterPipe,
    CreatureArticleUpdateComponent,
    DiaryentryArticleUpdateComponent,
    ItemArticleUpdateComponent,
    LocationArticleUpdateComponent,
    LocationAccordionComponent,
    OrganizationArticleUpdateComponent,
    FormlyComponent,
    QuestArticleComponent,
    QuestArticleUpdateComponent,
    QuestOverviewComponent,
    SpellsComponent,
    RecentlyUpdatedArticleComponent,
    DeleteToggleComponent,
    EditToggleComponent,
    ColoredSidebarLegendComponent,
    ObjectListComponent,
    SearchComponent,
    SessionAudioComponent,
    SessionAudioOverviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
        types: [
          { name: "file", component: FormlyFieldFile, wrappers: ['form-field'] },
          { name: "tinymce", component: FormlyComponent}
        ]
      }), //{ extras: { lazyRender: true } }
    FormlyBootstrapModule,
    CommonModule,
  ],
  providers: [
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
