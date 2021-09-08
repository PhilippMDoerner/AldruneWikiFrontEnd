import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from "@angular/common";
import { VimeModule } from "@vime/angular/dist";


import { AppComponent } from './app.component';
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
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
import { SpinnerComponent } from './components/utility/spinner/spinner.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { FormlyFieldFile } from './components/utility/file-upload/file-upload.component';
import { FileValueAccessor } from './components/utility/file-upload/file-value-accesor';

import { GroupByPipe, GroupByFirstLetterPipe } from "src/app/utils/pipes/groupObjects.pipe";
import { SafeHtmlPipe } from "src/app/utils/pipes/htmlSanitizer.pipe";
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
import { DeleteToggleComponent } from './components/utility/delete-toggle/delete-toggle.component';
import { EditToggleComponent } from './components/utility/edit-toggle/edit-toggle.component';
import { ColoredSidebarLegendComponent } from './components/utility/colored-sidebar-legend/colored-sidebar-legend.component';
import { ObjectListComponent } from './components/utility/object-list/object-list.component';
import { SearchComponent } from './components/articles/search/search.component';
import { SessionAudioComponent } from './components/articles/session-audio/session-audio.component';
import { SessionAudioOverviewComponent } from './components/articles/session-audio-overview/session-audio-overview.component';
import { SessionAudioUpdateComponent } from './components/articles/session-audio-update/session-audio-update.component';
import { MarkerComponent } from './components/articles/marker/marker.component';
import { MarkerUpdateComponent } from './components/articles/marker-update/marker-update.component';
import { MapComponent } from './components/articles/map/map.component';
import { MapUpdateComponent } from './components/articles/map-update/map-update.component';
import { LeafletMapComponent } from './components/utility/leaflet-map/leaflet-map.component';
import { MarkerMapCreateComponent } from './components/articles/marker-map-create/marker-map-create.component';
import { LocationArticleMapCreateComponent } from './components/articles/location-article-map-create/location-article-map-create.component';
import { QuoteGalleryComponent } from './components/utility/quote-gallery/quote-gallery.component';
import { LoginComponent } from './components/login/login.component';
import { httpInterceptorProviders } from "src/app/interceptors/index";
import { FormlyDatepickerComponent } from './components/utility/formly-datepicker/formly-datepicker.component';
import { SessionUpdateModalComponent } from './components/utility/session-update-modal/session-update-modal.component';
import { SessionUpdateWrapperComponent } from './components/utility/session-update-wrapper/session-update-wrapper.component';
import { TimestampListComponent } from './components/utility/timestamp-list/timestamp-list.component';
import { TimestampComponent } from './components/utility/timestamp/timestamp.component';
import { FormlyFormcontainerComponent } from './components/utility/formly-formcontainer/formly-formcontainer.component';
import { AdminGuardService, CampaignGuardService, LoginGuardService } from './services/permission.service';
import { SessionDeleteModalComponent } from './components/utility/session-delete-modal/session-delete-modal.component';
import { ArticleFooterComponent } from './components/utility/article-footer/article-footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Wiki1RequestComponent } from './components/wiki1-request/wiki1-request.component';
import { dateMessage, dateValidator, faPrefixMessage, iconValidator, integerValidator, invalidTimeMessage, notIntegerMessage, requiredIconMessage, requiredIconValidator, requiredMessage, requiredValidator, timeValidator, specialCharacterValidator, hasSpecialCharactersMessage, fieldMatchValidator, fieldsDontMatchMessage, sessionAuthorUniqueValidator, sessionAlreadyHasAuthor } from './utils/functions/formly-validation';
import { DiaryEntryEncounterComponent } from './components/utility/diary-entry-encounter/diary-entry-encounter.component';
import { DiaryEntryEncounterListComponent } from './components/utility/diary-entry-encounter-list/diary-entry-encounter-list.component';
import { QuoteOverviewComponent } from './components/articles/quote-overview/quote-overview.component';
import { QuotefieldComponent } from './components/utility/quotefield/quotefield.component';
import { SpellComponent } from './components/utility/spell/spell.component';
import { RuleComponent } from './components/utility/rule/rule.component';
import { AdminComponent } from './components/articles/admin/admin.component';
import { UserRowComponent } from './components/utility/user-row/user-row.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfigTablesComponent } from './components/articles/config-tables/config-tables.component';
import { CompareFormContainerComponent } from './components/utility/compare-form-container/compare-form-container.component';
import { DisplayFormContainerComponent } from './components/utility/display-form-container/display-form-container.component';
import { FormlySelectDisableComponent } from './components/utility/formly-select-disable/formly-select-disable.component';
import { ErrorComponent } from './components/error/error.component';
import { Home2Component } from './components/home2/home2.component';
import { SidebarComponent } from './components/utility/sidebar/sidebar.component';
import { RecentlyUpdatedArticlesListComponent } from './components/utility/recently-updated-articles-list/recently-updated-articles-list.component';
import { CampaignComponent } from './components/utility/campaign/campaign.component';
import { CampaignListComponent } from './components/utility/campaign-list/campaign-list.component';
import { CampaignOverviewComponent } from './components/articles/campaign-overview/campaign-overview.component';
import { BackgroundImageComponent } from './components/utility/background-image/background-image.component';
import { CampaignUpdateComponent } from './components/articles/campaign-update/campaign-update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
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
    DeleteToggleComponent,
    EditToggleComponent,
    ColoredSidebarLegendComponent,
    ObjectListComponent,
    SearchComponent,
    SessionAudioComponent,
    SessionAudioOverviewComponent,
    SessionAudioUpdateComponent,
    MarkerComponent,
    MarkerUpdateComponent,
    MapComponent,
    MapUpdateComponent,
    LeafletMapComponent,
    MarkerMapCreateComponent,
    LocationArticleMapCreateComponent,
    QuoteGalleryComponent,
    LoginComponent,
    SafeHtmlPipe,
    FormlyDatepickerComponent,
    SessionUpdateModalComponent,
    SessionUpdateWrapperComponent,
    TimestampListComponent,
    TimestampComponent,
    FormlyFormcontainerComponent,
    SessionDeleteModalComponent,
    ArticleFooterComponent,
    Wiki1RequestComponent,
    DiaryEntryEncounterComponent,
    DiaryEntryEncounterListComponent,
    QuoteOverviewComponent,
    QuotefieldComponent,
    SpellComponent,
    RuleComponent,
    AdminComponent,
    UserRowComponent,
    ProfileComponent,
    ConfigTablesComponent,
    CompareFormContainerComponent,
    DisplayFormContainerComponent,
    FormlySelectDisableComponent,
    ErrorComponent,
    Home2Component,
    SidebarComponent,
    RecentlyUpdatedArticlesListComponent,
    CampaignComponent,
    CampaignListComponent,
    CampaignOverviewComponent,
    BackgroundImageComponent,
    CampaignUpdateComponent,
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
          { name: "tinymce", component: FormlyComponent},
          { name: "datepicker", component: FormlyDatepickerComponent},
          { name: "session-create-edit", component: SessionUpdateModalComponent},
          { name: "formly-select-disable", component: FormlySelectDisableComponent},
        ],
        wrappers: [
          { name: "session-update-wrapper", component: SessionUpdateWrapperComponent },
        ],
        validationMessages:[
          invalidTimeMessage,
          requiredMessage,
          dateMessage,
          requiredIconMessage,
          faPrefixMessage,
          notIntegerMessage,
          hasSpecialCharactersMessage,
          fieldsDontMatchMessage,
          sessionAlreadyHasAuthor,
        ],
        validators:[
          timeValidator,
          requiredValidator,
          dateValidator,
          requiredIconValidator,
          iconValidator,
          integerValidator,
          specialCharacterValidator,
          fieldMatchValidator,
          sessionAuthorUniqueValidator,
        ]
      }), //{ extras: { lazyRender: true } }
    FormlyBootstrapModule,
    CommonModule,
    VimeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
    HammerModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    httpInterceptorProviders,
    CampaignGuardService,
    AdminGuardService,
    LoginGuardService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig
    }
  ],
  bootstrap: [
    AppComponent
  ],
  exports: [
    EncounterAccordionComponent
  ],
  schemas: [
  ]
})
export class AppModule { }
