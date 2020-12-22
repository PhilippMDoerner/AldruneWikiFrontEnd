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
    this.formlyService.genericSelect({key: "leader", valueProp: "name", optionsType: "character", required: false}),
    this.formlyService.genericSelect({key: "headquarter", optionsType: "location", required: false}),
  ];

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute,
    private formlyService: MyFormlyService,
    private warnings: WarningsService,  
    public routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? Constants.updateState : Constants.createState;

    this.paramter_subscription = this.route.params.subscribe(params => {
      if (this.formState === Constants.updateState){
        const organizationName: string = params.name;
        this.organizationService.getOrganization(organizationName).pipe(first()).subscribe(
          (organization: OrganizationObject) => this.model = organization,
          error => this.routingService.routeToErrorPage(error)
        );
        
      } else if (this.formState === Constants.createState) {
        this.model = new OrganizationObject();
      }
    })

  }

  onSubmit(){
    const isFormInUpdateState: boolean = (this.formState === Constants.updateState);
    const responseObservable: Observable<OrganizationObject> =  isFormInUpdateState ? this.organizationService.updateOrganization(this.model) : this.organizationService.createOrganization(this.model);

    responseObservable.pipe(first()).subscribe(
      (organization: OrganizationObject) => this.routingService.routeToApiObject(organization),
      error => this.warnings.showWarning(error)
    );
  }
  
  onCancel(){
    const isFormInUpdateState : boolean = (this.formState === Constants.updateState)
    if (isFormInUpdateState){
      const organizationName: string = this.route.snapshot.params.name;
      this.routingService.routeToPath('organization', {name: organizationName});
    } else {
      this.routingService.routeToPath('organization-overview');
    } 
  }

  ngOnDestroy(){
    if (this.paramter_subscription) this.paramter_subscription.unsubscribe();
  }
}