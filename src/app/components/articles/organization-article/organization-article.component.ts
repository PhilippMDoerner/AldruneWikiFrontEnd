import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Organization, OrganizationObject } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { RoutingService } from 'src/app/services/routing.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-organization-article',
  templateUrl: './organization-article.component.html',
  styleUrls: ['./organization-article.component.scss']
})
export class OrganizationArticleComponent implements OnInit {
  constants: any = Constants;
  organization: Organization;
  articleType: string = 'organization';

  private parameter_subscription: Subscription;

  constructor(
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const organizationName = params.name;

      this.organizationService.readByParam(organizationName).pipe(first()).subscribe(
        (organization: OrganizationObject) => this.organization = organization,
        error => this.routingService.routeToErrorPage(error)
      );
    })

  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.organization.description;
    this.organization.description = updatedDescription;

    this.organizationService.update(this.organization.pk, this.organization).pipe(first()).subscribe(
      (organization: OrganizationObject) => {},
      error =>{
        this.organization.description = oldDescription;
        this.warnings.showWarning(error);
      }
    );
  }

  deleteArticle(){
    this.organizationService.delete(this.organization.pk).pipe(first()).subscribe(
      response => this.routingService.routeToPath('organization-overview'),
      error => this.warnings.showWarning(error)
    );
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
