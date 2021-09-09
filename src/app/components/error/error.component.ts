import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  constants: any = Constants;

  campaign: CampaignOverview;

  parameterSubscription: Subscription;
  campaignSubscription: Subscription;

  errorStatus: number;

  errorContents: any = {
    400: {
      htmlBody: "It appears you supplied some invalid inputs!",
      title: "400 Bad Request",
      image: Constants.badInputImageUrl
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
  ) { }

  ngOnInit():void {
    this.parameterSubscription = this.route.params.subscribe( params => {
      const errorStatusParam: number = params["errorStatus"];
      const isKnownErrorStatus = this.errorContents.hasOwnProperty(errorStatusParam);
      this.errorStatus = isKnownErrorStatus ? errorStatusParam : 404;
    });

    this.campaignSubscription = this.globalUrlParams.getCurrentCampaign().subscribe(
      (campaign: CampaignOverview) => this.campaign = campaign
    );
  }

  ngOnDestroy(): void{
    if(this.parameterSubscription) this.parameterSubscription.unsubscribe();
    if(this.campaignSubscription) this.campaignSubscription.unsubscribe();
  }
}
