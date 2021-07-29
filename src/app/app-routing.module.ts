import { NgModule } from '@angular/core';
import { Routes,
		RouterModule } from '@angular/router';
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
import { AdminGuardService, LoginGuardService,
		PermissionGuardService } from './services/permission.service';
import { Wiki1RequestComponent } from './components/wiki1-request/wiki1-request.component';
import { QuoteOverviewComponent } from './components/articles/quote-overview/quote-overview.component';
import { AdminComponent } from './components/articles/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfigTablesComponent } from './components/articles/config-tables/config-tables.component';
import { ErrorComponent } from './components/error/error.component';
import { Home2Component } from './components/home2/home2.component';



const routes: Routes = [
	//Redirect Routes
	{
		path: "",
		redirectTo: `${Constants.wikiUrlFrontendPrefixNoSlash}/`,
		pathMatch: 'full',
		data: {name: 'start'}
	},

	//Home Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/`, 
		component: HomeComponent, data:{ name: "home1"}, 
		canActivate: [LoginGuardService]},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}`, 
		component: HomeComponent, data:{ name: "home2"}, 
		canActivate: [LoginGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/new`, 
		component: Home2Component, data:{ name: "home"}, 
		canActivate: [LoginGuardService]
	},

	//Admin Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/admin`,
		component: AdminComponent,
		data: { name: "admin", requiredPermissions: [Constants.adminPermission]},
		canActivate: [AdminGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/configtables`,
		component: ConfigTablesComponent,
		data: { name: "config-tables", requiredPermissions: [Constants.adminPermission]},
		canActivate: [AdminGuardService]
	},

	//Login Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/login`, 
		component: LoginComponent, 
		data:{ name: "login"}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/login/:state`, 
		component: LoginComponent, 
		data:{ name: "login-state"}
	},

	//User Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/profile/:username`,
		component: ProfileComponent,
		data: { name: "profile"},
		canActivate: [LoginGuardService]
	},

	//Character Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character`, 
		component: ArticleOverviewComponent, 
		data:{ name: "character-overview", requiredPermissions: [Constants.apiViewPermission]}, 
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/create`,
		component: CharacterArticleUpdateComponent, 
		data:{ name: "character-create", requiredPermissions: [Constants.apiCreatePermission]}, 
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:name`, 
		component: CharacterArticleComponent, 
		data:{ name: "character", requiredPermissions: [Constants.apiViewPermission]}, 
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:name/update`, 
		component: CharacterArticleUpdateComponent, 
		data:{ name: "character-update", requiredPermissions: [Constants.apiUpdatePermission]}, 
		canActivate: [PermissionGuardService]
	},

	//Encounter Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/encounter/:pk`, 
		component: EncounterComponent, 
		data:{ name: "encounter", requiredPermissions: [Constants.apiViewPermission]}, 
		canActivate: [PermissionGuardService]
	},

	//Location Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location`,
		component: ArticleOverviewComponent,
		data:{ name: "location-overview", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/create`,
		component: LocationArticleUpdateComponent,
		data:{ name: "location-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:parent_name/:name`,
		component: LocationArticleComponent,
		data:{ name: "location", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:parent_name/:name/create`,
		component: LocationArticleUpdateComponent,
		data:{ name: "location-parentlocation-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:latitude/:longitude/:map_name/create`,
		component: LocationArticleMapCreateComponent,
		data:{ name: "location-map-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:parent_name/:name/update`,
		component: LocationArticleUpdateComponent,
		data:{ name: "location-update", requiredPermissions: [Constants.apiUpdatePermission]},
		canActivate: [PermissionGuardService]
	},
	//DiaryEntry Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry`,
		component: ArticleOverviewComponent,
		data:{ name: "diaryentry-overview", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/create`,
		component: DiaryentryArticleUpdateComponent,
		data:{ name: "diaryentry-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:sessionNumber/:isMainSession/:authorName`,
		component: DiaryentryArticleComponent,
		data:{ name: "diaryentry", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:sessionNumber/:isMainSession/:authorName/update`,
		component: DiaryentryArticleUpdateComponent,
		data:{ name: "diaryentry-update", requiredPermissions: [Constants.apiUpdatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:sessionNumber/:isMainSession/:authorName/:displayMode`,
		component: DiaryentryArticleComponent,
		data:{ name: "diaryentry2", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:sessionNumber/:isMainSession/:authorName/:displayMode/update`,
		component: DiaryentryArticleUpdateComponent,
		data:{ name: "diaryentry2-update", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},

	//Creature Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature`,
		component: ArticleOverviewComponent,
		data:{ name: "creature-overview", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/create`,
		component: CreatureArticleUpdateComponent,
		data:{ name: "creature-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:name`,
		component: CreatureArticleComponent,
		data:{ name: "creature", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:name/update`,
		component: CreatureArticleUpdateComponent,
		data:{ name: "creature-update", requiredPermissions: [Constants.apiUpdatePermission]},
		canActivate: [PermissionGuardService]
	},

	// Organization Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization`,
		component: ArticleOverviewComponent,
		data:{ name: "organization-overview", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/create`,
		component: OrganizationArticleUpdateComponent,
		data:{ name: "organization-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:name`,
		component: OrganizationArticleComponent,
		data:{ name: "organization", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:name/update`,
		component: OrganizationArticleUpdateComponent,
		data:{ name: "organization-update", requiredPermissions: [Constants.apiUpdatePermission]},
		canActivate: [PermissionGuardService]
	},

	// Item Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item`,
		component: ArticleOverviewComponent,
		data:{ name: "item-overview", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/create`,
		component: ItemArticleUpdateComponent,
		data:{ name: "item-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:character_name/create`,
		component: ItemArticleUpdateComponent,
		data:{ name: "item-character-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:name`,
		component: ItemArticleComponent,
		data:{ name: "item", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:name/update`,
		component: ItemArticleUpdateComponent,
		data:{ name: "item-update", requiredPermissions: [Constants.apiUpdatePermission]},
		canActivate: [PermissionGuardService]
	},

	// Quest Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest`,
		component: QuestOverviewComponent,
		data:{ name: "quest-overview", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/create`,
		component: QuestArticleUpdateComponent,
		data:{ name: "quest-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:name`,
		component: QuestArticleComponent,
		data:{ name: "quest", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:name/update`,
		component: QuestArticleUpdateComponent,
		data:{ name: "quest-update", requiredPermissions: [Constants.apiUpdatePermission]},
		canActivate: [PermissionGuardService]
	},
	//Quote Route
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quotes/:name`,
		component: QuoteOverviewComponent,
		data: { name: "quote-overview", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},

	// Session Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/session`,
		component: HomeComponent,
		data:{name: "session-overview", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/session/create`,
		component: HomeComponent,
		data:{name: "session-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/session/:sessionNumber/:isMainSession`,
		component: HomeComponent,
		data:{name: "session", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/session/:sessionNumber/:isMainSession/update`,
		component: HomeComponent,
		data:{name: "session-update", requiredPermissions: [Constants.apiUpdatePermission]},
		canActivate: [PermissionGuardService]
	},

	// SessionAudio Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio`,
		component: SessionAudioOverviewComponent,
		data:{ name: "sessionaudio-overview", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/create`,
		component: SessionAudioUpdateComponent,
		data:{ name: "sessionaudio-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
			
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:isMainSession/:sessionNumber`,
		component: SessionAudioComponent,
		data:{ name: "sessionaudio", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:isMainSession/:sessionNumber/update`,
		component: SessionAudioUpdateComponent,
		data:{ name: "sessionaudio-update", requiredPermissions: [Constants.apiUpdatePermission]},
		canActivate: [PermissionGuardService]
	},

	// Marker Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:parent_location_name/:location_name/create`,
		component: MarkerUpdateComponent,
		data:{ name: "marker-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:latitude/:longitude/:map_name/create`,
		component: MarkerMapCreateComponent,
		data:{ name: "marker-map-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:parent_location_name/:location_name/:map_name`,
		component: MarkerComponent,
		data:{ name: "marker", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:parent_location_name/:location_name/:map_name/update`,
		component: MarkerUpdateComponent,
		data:{ name: "marker-update", requiredPermissions: [Constants.apiUpdatePermission]},
		canActivate: [PermissionGuardService]
	},


	// Map Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/create`,
		component: MapUpdateComponent,
		data:{ name: "map-create", requiredPermissions: [Constants.apiCreatePermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:name`,
		component: MapComponent,
		data:{ name: "map", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:name/update`,
		component: MapUpdateComponent,
		data:{ name: "map-update", requiredPermissions: [Constants.apiUpdatePermission]},
		canActivate: [PermissionGuardService]
	},


	// Core Route
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/rules`,
		component: RulesComponent,
		data:{ name: "rules", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/rules/:name`,
		component: RulesComponent,
		data:{ name: "rule", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/spells`,
		component: SpellsComponent,
		data:{ name: "spells", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/spells/:name`,
		component: SpellsComponent,
		data:{ name: "spell", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/recent-updates`,
		component: RecentlyUpdatedArticleComponent,
		data:{ name: "recent-updates", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/search`,
		component: SearchComponent,
		data:{ name: "startSearch", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/search/:searchString`,
		component: SearchComponent,
		data:{ name: "search", requiredPermissions: [Constants.apiViewPermission]},
		canActivate: [PermissionGuardService]
	},

	// Wiki1 Route. Required as Cache may redirect people to /wiki2 when they want to visit /wiki1
	{
		path: "wiki1",
		component: Wiki1RequestComponent,
		data:{ name: "wiki1"},
		children:[
			{
				path: '**',
				component: Wiki1RequestComponent,
			}
		]
	},

	// Error Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/error/:errorStatus`,
		component: ErrorComponent,
		data:{ name: "error"},
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/**`,
		component: ErrorComponent,
		data:{ name: "404"},
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
