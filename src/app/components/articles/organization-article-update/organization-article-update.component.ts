import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constants } from 'src/app/app.constants';
import { EmptyFormOrganization, Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CharacterService } from 'src/app/services/character/character.service';
import { OverviewService } from 'src/app/services/overview.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-organization-article-update',
  templateUrl: './organization-article-update.component.html',
  styleUrls: ['./organization-article-update.component.scss']
})
export class OrganizationArticleUpdateComponent implements OnInit {
  constants: any = Constants;

  private organization_subscription: Subscription;
  private parameter_subscription: Subscription;

  formState: string;

  form = new FormGroup({});
  model: Organization | EmptyFormOrganization;
  fields: FormlyFieldConfig[] = [
    {
      key: "name",
      type: "input",
      templateOptions:{
        label: "Name"
      }
    },
    {
      key: "leader",
      type: "select",
      templateOptions:{
        label: "Leader",
        labelProp: "name",
        valueProp: "name",
        options: this.selectOptionService.getOverviewItems('character'),
      }
    },
    {
      key: "headquarter",
      type: "select",
      templateOptions:{
        label: "Headquarter",
        labelProp: "name",
        valueProp: "pk",
        options: this.selectOptionService.getOverviewItems('location'),
      }
    },
  ];

  constructor(
    private selectOptionService: OverviewService,
    private organizationService: OrganizationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.formState = (this.router.url.includes("update")) ? this.constants.updateState : this.constants.createState;
    const organizationName: string = this.route.snapshot.params.name;

    if (this.formState === this.constants.updateState){
      this.organization_subscription = this.organizationService.getOrganization(organizationName).subscribe(item => {
        this.model = item;
      });
    } else if (this.formState === this.constants.createState) {
      this.model = new EmptyFormOrganization();
    } 
  }

  onSubmit(model: Organization){
    const isFormInUpdateState: boolean = (this.formState === this.constants.updateState);
    const responseObservable: any =  isFormInUpdateState ? this.organizationService.updateOrganization(model) : this.organizationService.createOrganization(model);

    responseObservable.subscribe(response => {
      console.log(response);
      this.router.navigateByUrl(`/organization/${model.name}`);
    }, error => console.log(error));
  }

  ngOnDestroy(){
    if (this.parameter_subscription) this.parameter_subscription.unsubscribe();
    if (this.organization_subscription) this.organization_subscription.unsubscribe();
  }
}