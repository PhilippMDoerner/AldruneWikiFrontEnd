import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { OrganizationObject, Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first } from 'rxjs/operators';
import { WarningsService } from 'src/app/services/warnings.service';
import { RoutingService } from 'src/app/services/routing.service';
import { ArticleFormMixin } from 'src/app/utils/functions/articleFormMixin';

@Component({
  selector: 'app-organization-article-update',
  templateUrl: './organization-article-update.component.html',
  styleUrls: ['./organization-article-update.component.scss']
})
export class OrganizationArticleUpdateComponent extends ArticleFormMixin implements OnInit {
  //Defining ArticleFormMixin
  userModel: OrganizationObject;
  serverModel: Organization;
  updateCancelRoute = {routeName: 'organization', params: {name: null }};
  creationCancelRoute = {routeName: 'organization-overview', params: {}};

  formlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name", isNameInput: true}),
    this.formlyService.genericSelect({key: "leader", valueProp: "name", optionsType: "character", required: false}),
    this.formlyService.genericSelect({key: "headquarter", optionsType: "location", required: false}),
  ];

  //Custom Properties
  private paramter_subscription: Subscription;

  constructor(
    organizationService: OrganizationService,
    router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
    public warnings: WarningsService,  
    public routingService: RoutingService,
  ) { 
    super(
      router,
      routingService,
      warnings,
      organizationService
    )
  }

  ngOnInit(): void {
    this.paramter_subscription = this.route.params.subscribe(params => {
      if (this.isInUpdateState()){
        const organizationName: string = params.name;
        const campaign: string = params.campaign;

        this.articleService.readByParam(campaign, organizationName).pipe(first()).subscribe(
          (organization: OrganizationObject) => this.userModel = organization,
          error => this.routingService.routeToErrorPage(error)
        );
        
      } else if (this.isInCreateState()) {
        this.userModel = new OrganizationObject();
      }
    })

  }

  ngOnDestroy(){
    if (this.paramter_subscription) this.paramter_subscription.unsubscribe();
  }
}