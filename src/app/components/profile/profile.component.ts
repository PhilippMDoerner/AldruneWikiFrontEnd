import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CampaignRole } from 'src/app/app.constants';
import { CampaignOverview } from 'src/app/models/campaign';
import { UserObject } from 'src/app/models/user';
import { CampaignService } from 'src/app/services/campaign.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';
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
export class ProfileComponent implements OnInit, AfterViewInit {
  //URLs
  homeUrl: string;

  @ViewChild('profileCard') profileCard: ElementRef;
  user: UserObject;
  campaign: CampaignOverview;
  campaignRolesList: {campaignName: string, role: CampaignRole}[];

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
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private refreshTokenService: RefreshTokenService,
    private campaignService: CampaignService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.campaign = this.route.snapshot.data["campaign"];
    this.user = this.route.snapshot.data["userData"]

    const campaignRoles = this.tokenService.getCampaignMemberships();
    const rolesList = Object.keys(campaignRoles).map(campaignName => {return {campaignName, role: campaignRoles[campaignName]}});
    this.campaignRolesList = rolesList;

    this.updateDynamicVariables(this.campaign);
  }


  ngAfterViewInit(): void{
    animateElement(this.profileCard.nativeElement, 'fadeIn');
  }

  updateDynamicVariables(campaign: CampaignOverview): void{
    this.homeUrl = this.routingService.getRoutePath('home2', {campaign: campaign.name});
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

  leaveCampaign(campaignRole: {campaignName: string, role: CampaignRole}): void{
    let campaignLeaveObservable: Observable<any>;
    switch(campaignRole.role){
      case CampaignRole.ADMIN:
        campaignLeaveObservable = this.campaignService.removeAdmin(campaignRole.campaignName, this.user);
        break;
      case CampaignRole.MEMBER:
      case CampaignRole.GLOBALMEMBER:
        campaignLeaveObservable = this.campaignService.removeMember(campaignRole.campaignName, this.user);
        break;
      case CampaignRole.GUEST:
      case CampaignRole.GLOBALGUEST:
        campaignLeaveObservable = this.campaignService.removeGuest(campaignRole.campaignName, this.user);
        break;
    };

    campaignLeaveObservable
      .pipe(first())
      .subscribe( async response => {
        const campaignIndex: number = this.campaignRolesList.findIndex(entry => entry.campaignName === campaignRole.campaignName);
        this.campaignRolesList.splice(campaignIndex, 1);

        await this.refreshTokenService.refreshUserData().toPromise();

        const leftCurrentCampaign: boolean = campaignRole.campaignName === this.campaign.name;
        if(leftCurrentCampaign){
          this.routingService.routeToPath("campaign-overview");
        } else {
          //Stay on component and reinitalize it
          this.ngOnInit();
        }
      });
  }

  deleteThisUser(): void{}
}
