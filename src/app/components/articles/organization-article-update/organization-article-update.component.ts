import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { OrganizationObject, Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { OverviewService } from 'src/app/services/overview.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';

@Component({
  selector: 'app-organization-article-update',
  templateUrl: './organization-article-update.component.html',
  styleUrls: ['./organization-article-update.component.scss']
})
export class OrganizationArticleUpdateComponent implements OnInit {
  constants: any = Constants;

  private organization_subscription: Subscription;

  formState: string;

  form = new FormGroup({});
  model: OrganizationObject;
  fields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "name"}),
    this.formlyService.genericSelect({key: "leader", valueProp: "name", optionsType: "character"}),
    this.formlyService.genericSelect({key: "headquarter", optionsType: "location"}),
  ];

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;
    const organizationName: string = this.route.snapshot.params.name;

    if (this.formState === this.constants.updateState){
      this.organization_subscription = this.organizationService.getOrganization(organizationName).subscribe(organization => {
        this.model = organization;
      });
    } else if (this.formState === this.constants.createState) {
      this.model = new OrganizationObject();
    } 
  }

  onSubmit(model: Organization){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.organizationService.updateOrganization(model) : this.organizationService.createOrganization(model);

    responseObservable.subscribe(response => {
      console.log(response);
      this.router.navigateByUrl(`${Constants.wikiUrlFrontendPrefix}/organization/${model.name}`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.organization_subscription) this.organization_subscription.unsubscribe();
  }
}