import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';

interface ErrorType {
  htmlBody: string, 
  title: string, 
  image: string,
}
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  constants: any = Constants;

  campaign: CampaignOverview;
  campaignHomeUrl: string;
  campaignOverviewUrl: string;
  loginUrl: string;
  hasTokenError: boolean;

  parameterSubscription: Subscription;
  campaignSubscription: Subscription;

  errorStatus: number;

  errorContents: { [key: number]: ErrorType } = {
    400: {
      htmlBody: "It appears you supplied some invalid inputs!",
      title: "400 Bad Request",
      image: Constants.badInputImageUrl
    },
    401: {
      htmlBody: "Sorry man, this is an invite-only club. Got to be logged in to get anything.",
      title: "401 Unauthorized",
      image: Constants.pageNotFoundImageUrl
    },
    403: {
      htmlBody: "Naughty naughty! You're not allowed to do what you just did!",
      title: "403 Forbidden",
      image: Constants.pageNotFoundImageUrl
    },
    404: {
      htmlBody: "We couldn't find the site you are looking for. <br> But a dragon found you !",
      title: "404 Not Found",
      image: Constants.pageNotFoundImageUrl
    },
    500: {
      htmlBody: "Something went seriously wrong on the server. <br> We'll be doing our best to force our Beholders to do better work!",
      title: "500 Server Error",
      image: Constants.serverErrorImageUrl
    },
    504: {
      htmlBody: "Your connection seems to be taking a short rest. <br>  Sadly, we need internet to show you a page you haven't recently visited and thus cached. <br> Please connect to the internet and try again.",
      title: "504 Gateway Timeout",
      image: Constants.timeoutImageUrl
    },
    0: {
      htmlBody: "Your connection seems to be taking a short rest. <br>  Sadly, we need internet to show you a page you haven't recently visited and thus cached. <br> Please connect to the internet and try again.",
      title: "504 Gateway Timeout",
      image: Constants.timeoutImageUrl
    },
  }

  constructor(
    public routingService: RoutingService,
    private route: ActivatedRoute,
    public globalUrlParams: GlobalUrlParamsService,
    private tokenService: TokenService,
  ) { }

  ngOnInit():void {
    this.parameterSubscription = this.route.params.subscribe( 
      params => {
        const errorStatusParam: number = parseInt(params["errorStatus"]);
        const isKnownErrorStatus = this.errorContents.hasOwnProperty(errorStatusParam);
        this.errorStatus = isKnownErrorStatus ? errorStatusParam : 404;
        this.hasTokenError = [401].includes(this.errorStatus);
        if(this.hasTokenError){
          this.tokenService.removeJWTTokenFromLocalStorage();
        }
      }
    );

    this.globalUrlParams.getCurrentCampaign()
      .then((campaign) => {
        this.campaign = campaign;
        this.campaignHomeUrl = this.routingService.getRoutePath("home1", {campaign: this.campaign.name});
      });
    this.loginUrl = this.routingService.getRoutePath("login");
    this.campaignOverviewUrl = this.routingService.getRoutePath("campaign-overview");
  }

  ngOnDestroy(): void{
    if(this.parameterSubscription) this.parameterSubscription.unsubscribe();
    if(this.campaignSubscription) this.campaignSubscription.unsubscribe();
  }
}
