import { Directive, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { Constants } from "src/app/app.constants";
import { ArticleObject } from "src/app/models/base-models";
import { CampaignOverview } from "src/app/models/campaign";
import { GenericObjectService } from "src/app/services/generic-object.service";
import { GenericService } from "src/app/services/generic.service";
import { GlobalUrlParamsService } from "src/app/services/global-url-params.service";
import { RoutingService } from "src/app/services/routing.service";
import { TokenService } from "src/app/services/token.service";
import { WarningsService } from "src/app/services/warnings.service";
import { animateElement } from "./animationDecorator";
import { PermissionUtilityFunctionMixin } from "./permissionDecorators";

@Directive()
export class ArticleListMixin extends PermissionUtilityFunctionMixin implements OnInit{
    constants = Constants;
    isLoadingArticles: boolean = false;

    campaign: CampaignOverview;
    
    articles: ArticleObject[];
    showArticleArray: boolean[];
    articleModelClass: any;

    articleStarterTitle = "New Article Item";
    articlesSortProperty = "name";

    //For Scrolling feature
    @ViewChildren("articles") articleElements: QueryList<any>;
    articlesInitialScrollParameter = "articleTitle"

    //For Animation Feature
    @ViewChild('listArticle') listArticleElement: ElementRef;

    constructor(
        public articleService: GenericObjectService | GenericService,
        route: ActivatedRoute,
        public routingService: RoutingService,
        public warnings: WarningsService,
        public globalUrlParams: GlobalUrlParamsService,
        tokenService: TokenService,
    ){
        super(tokenService, route);
    }

    /**
     * The Callback Order:
     * globalUrlParams.getCampaigns - Ensures through the filter on it that there must first be a campaign overview set. Sets up subscription so that campaign changes update the global value, but trigger no re-subscription to the route as that will be already set up the first time a campaign value comes around
     *      --> afterBackgroundDataLoaded - Called whenever campaign changes. Ensures campaign is set and sets up the subscription to params to update the page whenever the params change
     *      --> onArticleRouteChange - Called whenever the route changes. 
     *      --> loadArticleData
     */
    ngOnInit(): void{
        this.campaign = this.route.snapshot.data["campaign"];

        const articles = this.route.snapshot.data["articleList"];
        const sortedArticles = articles.sort((article1, article2) => {
            return article1[this.articlesSortProperty] < article2[this.articlesSortProperty] ? -1 : 1;
        });
        const isReverseSort: boolean = this.articlesSortProperty.startsWith("-");
        this.articles = isReverseSort ? sortedArticles.reverse() : sortedArticles;

        this.showArticleArray = this.articles.map(article => true);

        this.updateDynamicVariables(this.campaign, articles, this.route.snapshot.params);
    }
    

    ngAfterViewInit(): void{
        const articleTitle: string = this.route.snapshot.params[this.articlesInitialScrollParameter];
        this.scrollToArticleInQueryList(this.articleElements, articleTitle);

        this.animateListArticle();
    }

    animateListArticle(): void{
        if(!this.listArticleElement?.nativeElement) return;

        animateElement(this.listArticleElement.nativeElement, 'fadeIn')
            .then(_ => this.onInitAnimationEnd());
    }

    onInitAnimationEnd(): void{}

    scrollToArticleInQueryList(articleQueryList: QueryList<any>, articleTitle: string){
        if (articleTitle == null) return;
        articleTitle = articleTitle.toLowerCase();

        const targetArticle = articleQueryList.find( article => this.getArticleTitle(article)?.toLowerCase() == articleTitle);
        if(targetArticle == null) return;

        targetArticle.card.nativeElement.scrollIntoView();
    }

    getArticleTitle(article: any): string{
        return article.cardData.title;
    }


    /** This is purely a hook to be overwritten to set static urls and other variables*/
    updateDynamicVariables(campaign: CampaignOverview, articles: ArticleObject[], params: Params): void{}

    //ARTICLE MODIFICATION LOGIC
    addArticle(){
        const newArticle: ArticleObject = new this.articleModelClass();
        newArticle.name = this.articleStarterTitle;
        this.articles.unshift(newArticle);
    }


    onArticleDelete(index: number){
        this.articles.splice(index, 1);
    }
}