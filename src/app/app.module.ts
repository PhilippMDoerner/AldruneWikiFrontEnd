import { BrowserModule } from '@angular/platform-browser';
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
import { RecentlyUpdatedArticleComponent } from './components/articles/recently-updated-article/recently-updated-article.component';
import { DeleteToggleComponent } from './components/utility/delete-toggle/delete-toggle.component';
import { EditToggleComponent } from './components/utility/edit-toggle/edit-toggle.component';
import { ColoredSidebarLegendComponent } from './components/utility/colored-sidebar-legend/colored-sidebar-legend.component';
import { ObjectListComponent } from './components/utility/object-list/object-list.component';
import { SearchComponent } from './components/articles/search/search.component';
import { SessionAudioComponent } from './components/articles/session-audio/session-audio.component';
import { SessionAudioOverviewComponent } from './components/articles/session-audio-overview/session-audio-overview.component';
import { SessionAudioUpdateComponent } from './components/articles/session-audio-update/session-audio-update.component';
import { MarkerComponent } from './components/articles/marker/marker.component';
import { EncounterComponent } from './components/articles/encounter/encounter.component';
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
import { LoginGuardService, PermissionGuardService } from './services/permission.service';
import { SessionDeleteModalComponent } from './components/utility/session-delete-modal/session-delete-modal.component';
import { ArticleFooterComponent } from './components/utility/article-footer/article-footer.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GatewayTimeoutComponent } from './components/gateway-timeout/gateway-timeout.component';
import { Wiki1RequestComponent } from './components/wiki1-request/wiki1-request.component';
import { dateMessage, dateValidator, faPrefixMessage, iconValidator, integerValidator, invalidTimeMessage, notIntegerMessage, requiredIconMessage, requiredIconValidator, requiredMessage, requiredValidator, timeValidator, specialCharacterValidator, hasSpecialCharactersMessage } from './utils/functions/formly-validation';
import { DiaryEntryEncounterComponent } from './components/utility/diary-entry-encounter/diary-entry-encounter.component';
import { DiaryEntryEncounterListComponent } from './components/utility/diary-entry-encounter-list/diary-entry-encounter-list.component';
import { QuoteOverviewComponent } from './components/articles/quote-overview/quote-overview.component';
import { QuotefieldComponent } from './components/utility/quotefield/quotefield.component';

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
    SessionAudioUpdateComponent,
    MarkerComponent,
    EncounterComponent,
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
    GatewayTimeoutComponent,
    Wiki1RequestComponent,
    DiaryEntryEncounterComponent,
    DiaryEntryEncounterListComponent,
    QuoteOverviewComponent,
    QuotefieldComponent,
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
          { name: "session-create-edit", component: SessionUpdateModalComponent}
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
        ],
        validators:[
          timeValidator,
          requiredValidator,
          dateValidator,
          requiredIconValidator,
          iconValidator,
          integerValidator,
          specialCharacterValidator
        ]
      }), //{ extras: { lazyRender: true } }
    FormlyBootstrapModule,
    CommonModule,
    VimeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    httpInterceptorProviders,
    PermissionGuardService,
    LoginGuardService
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
