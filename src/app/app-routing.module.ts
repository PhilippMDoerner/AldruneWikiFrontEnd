import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ArticleOverviewComponent } from "src/app/components/articles/article-overview/article-overview.component";
import { CharacterArticleUpdateComponent } from "src/app/components/articles/character-article-update/character-article-update.component";
import { CharacterArticleComponent } from "src/app/components/articles/character-article/character-article.component";
import { CreatureArticleComponent } from "src/app/components/articles/creature-article/creature-article.component";
import { DiaryentryArticleComponent } from "src/app/components/articles/diaryentry-article/diaryentry-article.component";
import { ItemArticleComponent } from "src/app/components/articles/item-article/item-article.component";
import { LocationArticleComponent } from "src/app/components/articles/location-article/location-article.component";
import { OrganizationArticleComponent } from "src/app/components/articles/organization-article/organization-article.component";
import { RulesComponent } from "src/app/components/articles/rules/rules.component";
import { CampaignRole, Constants } from './app.constants';
import { AdminRoute, BaseNamedRoute, CampaignRoute, GeneralRoute } from './app.routing-models';
import { AdminComponent } from './components/articles/admin/admin.component';
import { CampaignOverviewComponent } from './components/articles/campaign-overview/campaign-overview.component';
import { CampaignUpdateComponent } from './components/articles/campaign-update/campaign-update.component';
import { ConfigTablesComponent } from './components/articles/config-tables/config-tables.component';
import { CreatureArticleUpdateComponent } from './components/articles/creature-article-update/creature-article-update.component';
import { DiaryentryArticleUpdateComponent } from './components/articles/diaryentry-article-update/diaryentry-article-update.component';
import { ItemArticleUpdateComponent } from './components/articles/item-article-update/item-article-update.component';
import { LocationArticleMapCreateComponent } from './components/articles/location-article-map-create/location-article-map-create.component';
import { LocationArticleUpdateComponent } from './components/articles/location-article-update/location-article-update.component';
import { MapUpdateComponent } from './components/articles/map-update/map-update.component';
import { MapComponent } from './components/articles/map/map.component';
import { MarkerMapCreateComponent } from './components/articles/marker-map-create/marker-map-create.component';
import { MarkerUpdateComponent } from './components/articles/marker-update/marker-update.component';
import { MarkerComponent } from './components/articles/marker/marker.component';
import { OrganizationArticleUpdateComponent } from './components/articles/organization-article-update/organization-article-update.component';
import { QuestArticleUpdateComponent } from './components/articles/quest-article-update/quest-article-update.component';
import { QuestArticleComponent } from './components/articles/quest-article/quest-article.component';
import { QuestOverviewComponent } from './components/articles/quest-overview/quest-overview.component';
import { QuoteOverviewComponent } from './components/articles/quote-overview/quote-overview.component';
import { SearchComponent } from './components/articles/search/search.component';
import { SessionAudioOverviewComponent } from './components/articles/session-audio-overview/session-audio-overview.component';
import { SessionAudioUpdateComponent } from './components/articles/session-audio-update/session-audio-update.component';
import { SessionAudioComponent } from './components/articles/session-audio/session-audio.component';
import { SessionsComponent } from './components/articles/sessions/sessions.component';
import { SpellsComponent } from './components/articles/spells/spells.component';
import { ErrorComponent } from './components/error/error.component';
import { Home2Component } from './components/home2/home2.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CampaignComponent } from './components/utility/campaign/campaign.component';
import { Wiki1RequestComponent } from './components/wiki1-request/wiki1-request.component';
import { AdminGuardService, CampaignGuardService, LoginGuardService } from './services/permission.service';
import { CampaignDetailResolver, CampaignResolver, CampaignStatisticsResolver, CampaignUpdateResolver, GlobalCampaignSetResolver } from './utils/resolvers/campaign-resolver';
import { CharacterResolver, CharacterUpdateResolver } from './utils/resolvers/character-resolver';
import { CreatureResolver, CreatureUpdateResolver } from './utils/resolvers/creature-resolver';
import { DiaryentryResolver, DiaryentryUpdateResolver } from './utils/resolvers/diaryentry-resolver';
import { ItemCharacterCreationResolver, ItemResolver, ItemUpdateResolver } from './utils/resolvers/item-resolver';
import { LocationMapCreateResolver, LocationResolver, LocationUpdateResolver } from './utils/resolvers/location-resolver';
import { MapResolver, MapUpdateResolver } from './utils/resolvers/map-resolver';
import { MarkerMapCreateResolver, MarkerResolver, MarkerUpdateResolver } from './utils/resolvers/marker-resolver';
import { OrganizationResolver, OrganizationUpdateResolver } from './utils/resolvers/organization-resolver';
import { OverviewResolver } from './utils/resolvers/overview-resolver';
import { QuestOverviewResolver, QuestResolver, QuestUpdateResolver } from './utils/resolvers/quest-resolver';
import { QuoteResolver } from './utils/resolvers/quote-resolver';
import { RuleResolver } from './utils/resolvers/rule-resolver';
import { SearchResolver } from './utils/resolvers/search-resolver';
import { SessionResolver } from './utils/resolvers/session-resolver';
import { SessionAudioOverviewResolver, SessionAudioResolver, SessionAudioUpdateResolver, TimestampResolver } from './utils/resolvers/sessionaudio-resolver';
import { SpellResolver } from './utils/resolvers/spell-resolver';
import { UserResolver } from './utils/resolvers/user-resolver';


const generalRoutes: GeneralRoute[] = [
	//Redirect Routes
	{
		path: "",
		redirectTo: `${Constants.wikiUrlFrontendPrefixNoSlash}/campaigns`, 
		pathMatch: 'full',
		data: {name: 'start'}
	},
	{
		path: "wiki2",
		redirectTo: `${Constants.wikiUrlFrontendPrefixNoSlash}/campaigns`, 
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
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/profile/:username`,
		component: ProfileComponent,
		data: { name: "direct-profile"},
		canActivate: [LoginGuardService],
		resolve: {
			userData: UserResolver
		}
	},
	//Campaign Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/campaigns`, 
		component: CampaignOverviewComponent, 
		data:{ name: "campaign-overview"}, 
		canActivate: [LoginGuardService],
		resolve: {
			_: GlobalCampaignSetResolver
		}
	},
	//User Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/profile/:campaign/:username`,
		component: ProfileComponent,
		data: { name: "direct-campaign-profile"},
		canActivate: [LoginGuardService],
		resolve: {
			campaign: CampaignResolver,
			userData: UserResolver
		}
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
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
		}
	},

	//General Campaign Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/home/:campaign`, 
		component: Home2Component, data:{ name: "home2", requiredRole: CampaignRole.GUEST}, 
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/campaign/:campaign`, 
		component: CampaignComponent, 
		data:{ name: "campaign-admin", requiredRole: CampaignRole.ADMIN}, 
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: CampaignDetailResolver,
			campaignStatistics: CampaignStatisticsResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/campaign/:campaign/update`, 
		component: CampaignUpdateComponent, 
		data:{ name: "campaign-update", requiredRole: CampaignRole.ADMIN}, 
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: CampaignUpdateResolver,
		}
	},

	//Character Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:campaign`, 
		component: ArticleOverviewComponent, 
		data:{ name: "character-overview", requiredRole: CampaignRole.GUEST}, 
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			overviewList: OverviewResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:campaign/create`,
		component: CharacterArticleUpdateComponent, 
		data:{ name: "character-create", requiredRole: CampaignRole.MEMBER}, 
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: CharacterUpdateResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:campaign/:name`, 
		component: CharacterArticleComponent, 
		data:{ name: "character", requiredRole: CampaignRole.GUEST}, 
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: CharacterResolver
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/character/:campaign/:name/update`, 
		component: CharacterArticleUpdateComponent, 
		data: { name: "character-update", requiredRole: CampaignRole.MEMBER}, 
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: CharacterUpdateResolver,
		}
	},

	//Location Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign`,
		component: ArticleOverviewComponent,
		data:{ name: "location-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			overviewList: OverviewResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign/create`,
		component: LocationArticleUpdateComponent,
		data:{ name: "location-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: LocationUpdateResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign/:parent_name/:name`,
		component: LocationArticleComponent,
		data:{ name: "location", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: LocationResolver
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign/:parent_name/:name/create`,
		component: LocationArticleUpdateComponent,
		data:{ name: "location-parentlocation-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: LocationUpdateResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign/:latitude/:longitude/:map_name/create`,
		component: LocationArticleMapCreateComponent,
		data:{ name: "location-map-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			locationModelData: LocationMapCreateResolver,
			markerModelData: MarkerMapCreateResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/location/:campaign/:parent_name/:name/update`,
		component: LocationArticleUpdateComponent,
		data:{ name: "location-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: LocationUpdateResolver,
		}
	},

	//DiaryEntry Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:campaign`,
		component: ArticleOverviewComponent,
		data:{ name: "diaryentry-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			overviewList: OverviewResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:campaign/create`,
		component: DiaryentryArticleUpdateComponent,
		data:{ name: "diaryentry-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: DiaryentryUpdateResolver
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:campaign/:sessionNumber/:isMainSession/:authorName`,
		component: DiaryentryArticleComponent,
		data:{ name: "diaryentry", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: DiaryentryResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:campaign/:sessionNumber/:isMainSession/:authorName/update`,
		component: DiaryentryArticleUpdateComponent,
		data:{ name: "diaryentry-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: DiaryentryUpdateResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/diaryentry/:campaign/:sessionNumber/:isMainSession/:authorName/:encounterTitle`,
		component: DiaryentryArticleComponent,
		data:{ name: "diaryentry-encounter", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: DiaryentryResolver,
		}
	},

	//Creature Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:campaign`,
		component: ArticleOverviewComponent,
		data:{ name: "creature-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			overviewList: OverviewResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:campaign/create`,
		component: CreatureArticleUpdateComponent,
		data:{ name: "creature-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: CreatureUpdateResolver
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:campaign/:name`,
		component: CreatureArticleComponent,
		data:{ name: "creature", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: CreatureResolver
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/creature/:campaign/:name/update`,
		component: CreatureArticleUpdateComponent,
		data:{ name: "creature-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: CreatureUpdateResolver
		}
	},

	// Organization Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:campaign`,
		component: ArticleOverviewComponent,
		data:{ name: "organization-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			overviewList: OverviewResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:campaign/create`,
		component: OrganizationArticleUpdateComponent,
		data:{ name: "organization-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: OrganizationUpdateResolver
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:campaign/:name`,
		component: OrganizationArticleComponent,
		data:{ name: "organization", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: OrganizationResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/organization/:campaign/:name/update`,
		component: OrganizationArticleUpdateComponent,
		data:{ name: "organization-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: OrganizationUpdateResolver
		}
	},

	// Item Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:campaign`,
		component: ArticleOverviewComponent,
		data:{ name: "item-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			overviewList: OverviewResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:campaign/create`,
		component: ItemArticleUpdateComponent,
		data:{ name: "item-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: ItemUpdateResolver
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:campaign/:character_name/create`,
		component: ItemArticleUpdateComponent,
		data:{ name: "item-character-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: ItemCharacterCreationResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:campaign/:name`,
		component: ItemArticleComponent,
		data:{ name: "item", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: ItemResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/item/:campaign/:name/update`,
		component: ItemArticleUpdateComponent,
		data:{ name: "item-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: ItemUpdateResolver
		}
	},

	// Quest Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:campaign`,
		component: QuestOverviewComponent,
		data:{ name: "quest-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			overviewList: QuestOverviewResolver
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:campaign/create`,
		component: QuestArticleUpdateComponent,
		data:{ name: "quest-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: QuestUpdateResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:campaign/:name`,
		component: QuestArticleComponent,
		data:{ name: "quest", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: QuestResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quest/:campaign/:name/update`,
		component: QuestArticleUpdateComponent,
		data:{ name: "quest-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: QuestUpdateResolver,
		}
	},

	//Quote Route
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/quotes/:campaign/:name`,
		component: QuoteOverviewComponent,
		data: { name: "quote-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			character: CharacterResolver,
			articleList: QuoteResolver,
		}
	},

	// SessionAudio Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:campaign`,
		component: SessionAudioOverviewComponent,
		data:{ name: "sessionaudio-overview", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			overviewList: SessionAudioOverviewResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:campaign/create`,
		component: SessionAudioUpdateComponent,
		data:{ name: "sessionaudio-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: SessionAudioUpdateResolver
		}
	},
			
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:campaign/:isMainSession/:sessionNumber`,
		component: SessionAudioComponent,
		data:{ name: "sessionaudio", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: SessionAudioResolver,
			timestamps: TimestampResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessionaudio/:campaign/:isMainSession/:sessionNumber/update`,
		component: SessionAudioUpdateComponent,
		data:{ name: "sessionaudio-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: SessionAudioUpdateResolver
		}
	},

	// Marker Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:campaign/:parent_location_name/:location_name/create`,
		component: MarkerUpdateComponent,
		data:{ name: "marker-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: MarkerUpdateResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:campaign/:latitude/:longitude/:map_name/create`,
		component: MarkerMapCreateComponent,
		data:{ name: "marker-map-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: MarkerMapCreateResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:campaign/:parent_location_name/:location_name/:map_name`,
		component: MarkerComponent,
		data:{ name: "marker", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: MarkerResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/marker/:campaign/:parent_location_name/:location_name/:map_name/update`,
		component: MarkerUpdateComponent,
		data:{ name: "marker-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			modelData: MarkerUpdateResolver,
		}
	},


	// Map Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:campaign/create`,
		component: MapUpdateComponent,
		data:{ name: "map-create", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: { 
			campaign: CampaignResolver,
			modelData: MapUpdateResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:campaign/default`,
		component: MapComponent,
		data:{ name: "default-map", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: MapResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:campaign/:name`,
		component: MapComponent,
		data:{ name: "map", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			article: MapResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/map/:campaign/:name/update`,
		component: MapUpdateComponent,
		data:{ name: "map-update", requiredRole: CampaignRole.MEMBER},
		canActivate: [CampaignGuardService],
		resolve: { 
			campaign: CampaignResolver,
			modelData: MapUpdateResolver,
		}
	},


	// Core Route
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/rules/:campaign`,
		component: RulesComponent,
		data:{ name: "rules", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			articleList: RuleResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/rules/:campaign/:name`,
		component: RulesComponent,
		data:{ name: "rule", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			articleList: RuleResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/spells/:campaign`,
		component: SpellsComponent,
		data:{ name: "spells", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			articleList: SpellResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/spells/:campaign/:name`,
		component: SpellsComponent,
		data:{ name: "spell", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			articleList: SpellResolver,
		}
	},
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/sessions/:campaign`,
		component: SessionsComponent,
		data:{ name: "sessions", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			articleList: SessionResolver,
		}
	},

	//Search Routes
	{
		path: `${Constants.wikiUrlFrontendPrefixNoSlash}/search/:campaign/:searchString`,
		component: SearchComponent,
		data:{ name: "campaignSearch", requiredRole: CampaignRole.GUEST},
		canActivate: [CampaignGuardService],
		resolve: {
			campaign: CampaignResolver,
			searchResults: SearchResolver,
		}
	},
];



export const routes: BaseNamedRoute[] = [].concat(generalRoutes, adminRoutes, campaignRoutes);

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
