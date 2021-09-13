import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CampaignOverview } from 'src/app/models/campaign';
import { UserObject } from 'src/app/models/user';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('profileCard') profileCard: ElementRef;
  user: UserObject;
  parameterSubscription: Subscription;
  campaign: CampaignOverview;
  campaignRolesList: {campaignName: string, role: string}[];

  profileEditState: boolean = false;
  passwordEditState: boolean = false;

  passwordModel: {};
  passwordFields: FormlyFieldConfig[] = [
    this.formlyService.genericPasswordInput({key: "oldPassword", label: "Your old password"}),
    this.formlyService.confirmedPasswordInput({label: "New Password"})
  ];

  profileModel: {};
  profileFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "username"}),
    this.formlyService.genericInput({key: "email", required: false})
  ]

  constructor(
    private userService: UserService,
    public routingService: RoutingService,
    private formlyService: MyFormlyService,
    private warnings : WarningsService,
    private globalUrlParams: GlobalUrlParamsService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.userService.getThisUser().pipe(first()).subscribe(
      (user: UserObject) => this.user = user,
      error => this.routingService.routeToPath(error)
    );

    this.parameterSubscription = this.globalUrlParams.getCurrentCampaign().subscribe(
      (campaign: CampaignOverview) => this.afterCampaignLoadFinished(campaign)
    );
  }

  afterCampaignLoadFinished(campaign: CampaignOverview): void{
    this.campaign = campaign;
    const campaignRoles = this.tokenService.getCampaignMemberships();
    const rolesList = Object.keys(campaignRoles).map(campaignName => {return {campaignName, role: campaignRoles[campaignName]}})
    this.campaignRolesList = rolesList;
  }

  ngAfterViewInit(): void{
    animateElement(this.profileCard.nativeElement, 'fadeIn');
  }

  toggleProfileEditState(): void{
    this.profileEditState = !this.profileEditState;

    if(this.profileEditState){
      this.profileModel = {username: this.user.username, email: this.user.email};
    }
  }

  togglePasswordEditState(): void{
    this.passwordEditState = !this.passwordEditState;

    if(this.passwordEditState){
      this.passwordModel = {};
    }
  }

  updatePassword(): void{
    const passwordData = {
      password: this.passwordModel['password'],
      oldPassword: this.passwordModel['oldPassword']
    };

    this.userService.patchUser(this.user.pk, passwordData).pipe(first()).subscribe(
      (updatedUser: UserObject) => {
        this.user = updatedUser;
        this.passwordEditState = false;
      },
      error => this.warnings.showWarning(error)
    );
  }

  updateProfile(): void{
    this.userService.patchUser(this.user.pk, this.profileModel).pipe(first()).subscribe(
      (updatedUser: UserObject) => {
        this.user = updatedUser;
        this.profileEditState = false;
      },
      error => this.warnings.showWarning(error)
    )
  }

  deleteThisUser(): void{

  }

  ngOnDestroy(): void{
    if(this.parameterSubscription) this.parameterSubscription.unsubscribe();
  }

}
