import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { OrganizationObject, Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { OverviewService } from 'src/app/services/overview.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-organization-article-update',
  templateUrl: './organization-article-update.component.html',
  styleUrls: ['./organization-article-update.component.scss']
})
export class OrganizationArticleUpdateComponent implements OnInit {
  constants: any = Constants;

  private paramter_subscription: Subscription;

  formState: string;

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

    this.paramter_subscription = this.route.params.subscribe(params => {
      if (this.formState === this.constants.updateState){
        const organizationName: string = params.name;
        this.organizationService.getOrganization(organizationName).pipe(first()).subscribe(
          (organization: OrganizationObject) => this.model = organization
        );
        
      } else if (this.formState === this.constants.createState) {
        this.model = new OrganizationObject();
      }
    })

  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: Observable<OrganizationObject> =  isFormInUpdateState ? this.organizationService.updateOrganization(this.model) : this.organizationService.createOrganization(this.model);

    responseObservable.pipe(first()).subscribe(
      (organization: OrganizationObject) => Constants.routeToApiObject(this.router, organization),
      error => console.log(error)
    );
  }
  
  onCancel(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)
    if (isFormInUpdateState){
      const organizationName: string = this.route.snapshot.params.name;
      Constants.routeToPath(this.router, 'organization', {name: organizationName});
    } else {
      Constants.routeToPath(this.router, 'organization-overview');
    } 
  }

  ngOnDestroy(){
    if (this.paramter_subscription) this.paramter_subscription.unsubscribe();
  }
}