import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Constants } from 'src/app/app.constants';
import { Organization, OrganizationObject } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization/organization.service';
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
    private router: Router,
    private warnings: WarningsService
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const organizationName = params.name;

      this.organizationService.getOrganization(organizationName).pipe(first()).subscribe(
        (organization: OrganizationObject) => this.organization = organization,
        error => Constants.routeToErrorPage(this.router, error)
      );
    })

  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.organization.description;
    this.organization.description = updatedDescription;

    this.organizationService.updateOrganization(this.organization).pipe(first()).subscribe(
      (organization: OrganizationObject) => {},
      error =>{
        this.organization.description = oldDescription;
        this.warnings.showWarning(error);
      }
    );
  }

  deleteArticle(){
    this.organizationService.deleteOrganization(this.organization.pk).pipe(first()).subscribe(
      response => Constants.routeToPath(this.router, 'organization-overview'),
      error => this.warnings.showWarning(error)
    );
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
  }
}
