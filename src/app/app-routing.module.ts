import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
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
import { SearchComponent } from './components/articles/search/search.component';
import { SessionAudioComponent } from './components/articles/session-audio/session-audio.component';
import { SessionAudioOverviewComponent } from './components/articles/session-audio-overview/session-audio-overview.component';
import { SessionAudioUpdateComponent } from './components/articles/session-audio-update/session-audio-update.component';
import { MarkerComponent } from './components/articles/marker/marker.component';
import { MarkerUpdateComponent } from './components/articles/marker-update/marker-update.component';
import { MapComponent } from './components/articles/map/map.component';
import { MapUpdateComponent } from './components/articles/map-update/map-update.component';
import { MarkerMapCreateComponent } from './components/articles/marker-map-create/marker-map-create.component';
import { LocationArticleMapCreateComponent } from './components/articles/location-article-map-create/location-article-map-create.component';
import { LoginComponent } from './components/login/login.component';
import { CampaignRole, Constants } from './app.constants';
import { AdminGuardService, CampaignGuardService, LoginGuardService} from './services/permission.service';
import { Wiki1RequestComponent } from './components/wiki1-request/wiki1-request.component';
import { QuoteOverviewComponent } from './components/articles/quote-overview/quote-overview.component';
import { AdminComponent } from './components/articles/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfigTablesComponent } from './components/articles/config-tables/config-tables.component';
import { ErrorComponent } from './components/error/error.component';
import { Home2Component } from './components/home2/home2.component';
import { CampaignOverviewComponent } from './components/articles/campaign-overview/campaign-overview.component';
import { CampaignComponent } from './components/utility/campaign/campaign.component';
import { CampaignUpdateComponent } from './components/articles/campaign-update/campaign-update.component';
import { AdminRoute, CampaignRoute, GeneralRoute } from './app.routing-models';


const generalRoutes: GeneralRoute[] = [
	//Redirect Routes
	{
		path: "",
		redirectTo: `${Constants.wikiUrlFrontendPrefixNoSlash}/home/${Constants.defaultCampaign}`,
		pathMatch: 'full',
		data: {name: 'start'}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/home`,
		redirectTo: `${Constants.wikiUrlFrontendPrefixNoSlash}/campaigns`, 
		pathMatch: "full",
		data: {name: "no-campaigns"}
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
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/profile/:campaign/:username`,
		component: ProfileComponent,
		data: { name: "profile"},
		canActivate: [LoginGuardService]
	},
	//Campaign Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/campaigns`, 
		component: CampaignOverviewComponent, 
		data:{ name: "campaign-overview"}, 
		canActivate: [LoginGuardService]
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


const adminRoutes: AdminRoute[] = [
	//General Admin Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/admin`,
		component: AdminComponent,
		data: { name: "admin"},
		canActivate: [AdminGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/configtables`,
		component: ConfigTablesComponent,
		data: { name: "config-tables"},
		canActivate: [AdminGuardService]
	},

	//Campaign specific admin Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/campaign/create`, 
		component: CampaignUpdateComponent, 
		data:{ name: "campaign-create"}, 
		canActivate: [AdminGuardService]
	},
]


const campaignRoutes: CampaignRoute[] = [
	//Home Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/home/:campaign`, 
		component: Home2Component, data:{ name: "home1", requiredRole: CampaignRole.GUEST}, 
		canActivate: [CampaignGuardService]
	},

	//General Campaign Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/home/:campaign`, 
		component: Home2Component, data:{ name: "home2", requiredRole: CampaignRole.GUEST}, 
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/campaign/:campaign`, 
		component: CampaignComponent, 
		data:{ name: "campaign-admin", requiredRole: CampaignRole.ADMIN}, 
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/campaign/:campaign/update`, 
		component: CampaignUpdateComponent, 
		data:{ name: "campaign-update", requiredRole: CampaignRole.ADMIN}, 
		canActivate: [CampaignGuardService]
	},

	//Character Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:campaign`, 
		component: ArticleOverviewComponent, 
		data:{ name: "character-overview", requiredRole: CampaignRole.GUEST}, 
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:campaign/create`,
		component: CharacterArticleUpdateComponent, 
		data:{ name: "character-create", requiredRole: CampaignRole.MEMBER}, 
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:campaign/:name`, 
		component: CharacterArticleComponent, 
		data:{ name: "character", requiredRole: CampaignRole.GUEST}, 
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:campaign/:name/update`, 
		component: CharacterArticleUpdateComponent, 
		data:{ name: "character-update", requiredRole: CampaignRole.MEMBER}, 
		canActivate: [CampaignGuardService]
	},

	//Location Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign`,
		component: ArticleOverviewComponent,
		data:{ name: "location-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign/create`,
		component: LocationArticleUpdateComponent,
		data:{ name: "location-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign/:parent_name/:name`,
		component: LocationArticleComponent,
		data:{ name: "location", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign/:parent_name/:name/create`,
		component: LocationArticleUpdateComponent,
		data:{ name: "location-parentlocation-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign/:latitude/:longitude/:map_name/create`,
		component: LocationArticleMapCreateComponent,
		data:{ name: "location-map-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign/:parent_name/:name/update`,
		component: LocationArticleUpdateComponent,
		data:{ name: "location-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},

	//DiaryEntry Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:campaign`,
		component: ArticleOverviewComponent,
		data:{ name: "diaryentry-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:campaign/create`,
		component: DiaryentryArticleUpdateComponent,
		data:{ name: "diaryentry-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:campaign/:sessionNumber/:isMainSession/:authorName`,
		component: DiaryentryArticleComponent,
		data:{ name: "diaryentry", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:campaign/:sessionNumber/:isMainSession/:authorName/update`,
		component: DiaryentryArticleUpdateComponent,
		data:{ name: "diaryentry-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:campaign/:sessionNumber/:isMainSession/:authorName/:encounterTitle`,
		component: DiaryentryArticleComponent,
		data:{ name: "diaryentry-encounter", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},

	//Creature Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:campaign`,
		component: ArticleOverviewComponent,
		data:{ name: "creature-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:campaign/create`,
		component: CreatureArticleUpdateComponent,
		data:{ name: "creature-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:campaign/:name`,
		component: CreatureArticleComponent,
		data:{ name: "creature", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:campaign/:name/update`,
		component: CreatureArticleUpdateComponent,
		data:{ name: "creature-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},

	// Organization Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:campaign`,
		component: ArticleOverviewComponent,
		data:{ name: "organization-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:campaign/create`,
		component: OrganizationArticleUpdateComponent,
		data:{ name: "organization-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:campaign/:name`,
		component: OrganizationArticleComponent,
		data:{ name: "organization", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:campaign/:name/update`,
		component: OrganizationArticleUpdateComponent,
		data:{ name: "organization-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},

	// Item Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:campaign`,
		component: ArticleOverviewComponent,
		data:{ name: "item-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:campaign/create`,
		component: ItemArticleUpdateComponent,
		data:{ name: "item-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:campaign/:character_name/create`,
		component: ItemArticleUpdateComponent,
		data:{ name: "item-character-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:campaign/:name`,
		component: ItemArticleComponent,
		data:{ name: "item", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:campaign/:name/update`,
		component: ItemArticleUpdateComponent,
		data:{ name: "item-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},

	// Quest Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:campaign`,
		component: QuestOverviewComponent,
		data:{ name: "quest-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:campaign/create`,
		component: QuestArticleUpdateComponent,
		data:{ name: "quest-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:campaign/:name`,
		component: QuestArticleComponent,
		data:{ name: "quest", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:campaign/:name/update`,
		component: QuestArticleUpdateComponent,
		data:{ name: "quest-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},

	//Quote Route
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quotes/:campaign/:name`,
		component: QuoteOverviewComponent,
		data: { name: "quote-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},

	// SessionAudio Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:campaign`,
		component: SessionAudioOverviewComponent,
		data:{ name: "sessionaudio-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:campaign/create`,
		component: SessionAudioUpdateComponent,
		data:{ name: "sessionaudio-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
			
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:campaign/:isMainSession/:sessionNumber`,
		component: SessionAudioComponent,
		data:{ name: "sessionaudio", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:campaign/:isMainSession/:sessionNumber/update`,
		component: SessionAudioUpdateComponent,
		data:{ name: "sessionaudio-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},

	// Marker Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:campaign/:parent_location_name/:location_name/create`,
		component: MarkerUpdateComponent,
		data:{ name: "marker-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:campaign/:latitude/:longitude/:map_name/create`,
		component: MarkerMapCreateComponent,
		data:{ name: "marker-map-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:campaign/:parent_location_name/:location_name/:map_name`,
		component: MarkerComponent,
		data:{ name: "marker", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:campaign/:parent_location_name/:location_name/:map_name/update`,
		component: MarkerUpdateComponent,
		data:{ name: "marker-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},


	// Map Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:campaign/create`,
		component: MapUpdateComponent,
		data:{ name: "map-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:campaign`,
		component: MapComponent,
		data:{ name: "default-map", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:campaign/:name`,
		component: MapComponent,
		data:{ name: "map", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:campaign/:name/update`,
		component: MapUpdateComponent,
		data:{ name: "map-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService]
	},


	// Core Route
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/rules/:campaign`,
		component: RulesComponent,
		data:{ name: "rules", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/rules/:campaign/:name`,
		component: RulesComponent,
		data:{ name: "rule", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/spells/:campaign`,
		component: SpellsComponent,
		data:{ name: "spells", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/spells/:campaign/:name`,
		component: SpellsComponent,
		data:{ name: "spell", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},

	//Search Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/search`,
		component: SearchComponent,
		data:{ name: "startSearch", requiredRole: CampaignRole.GLOBALGUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/search/:searchString`,
		component: SearchComponent,
		data:{ name: "search", requiredRole: CampaignRole.GLOBALGUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/:campaign/search`,
		component: SearchComponent,
		data:{ name: "startCampaignSearch", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/search/:campaign/:searchString`,
		component: SearchComponent,
		data:{ name: "campaignSearch", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService]
	},
];



export const routes: Route[] = [].concat(generalRoutes, adminRoutes, campaignRoutes);

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
