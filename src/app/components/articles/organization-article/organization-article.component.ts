import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization/organization.service';

@Component({
  selector: 'app-organization-article',
  templateUrl: './organization-article.component.html',
  styleUrls: ['./organization-article.component.scss']
})
export class OrganizationArticleComponent implements OnInit {
  constants: any = Constants;
  organization: Organization;
  isArticleDeleteState: boolean = false;
  articleType: string = 'organization';

  private organization_subscription: Subscription;
  private parameter_subscription: Subscription;

  constructor(
    private organizationService: OrganizationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parameter_subscription = this.route.params.subscribe(params => {
      const organizationName = params['name'];

      this.organization_subscription = this.organizationService.getOrganization(organizationName).subscribe(organization => {
        this.organization = organization;
      }, error =>{ this.router.navigateByUrl("error");});
    });
  }

  onDescriptionUpdate(updatedDescription){
    const oldDescription = this.organization.description;
    this.organization.description = updatedDescription;
    this.organizationService.updateOrganization(this.organization).subscribe(organization => {
    }, error =>{
      this.organization.description = oldDescription;
      console.log(error);
    })
  }

  toggleDeleteRequest(){
    this.isArticleDeleteState = !this.isArticleDeleteState
  }

  deleteArticle(){
      this.organizationService.deleteOrganization(this.organization.pk).subscribe(response => {
        this.router.navigateByUrl("/organization")
      }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.organization_subscription) this.organization_subscription.unsubscribe();
  }
}
