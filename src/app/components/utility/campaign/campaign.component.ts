import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { OverviewType } from 'src/app/app.constants';
import { CampaignObject, CampaignOverview, WikiStatistics } from 'src/app/models/campaign';
import { EmptySearchResponse } from 'src/app/models/emptySearchResponse';
import { User, UserObject } from 'src/app/models/user';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { ArticleMixin } from 'src/app/utils/functions/articleMixin';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent extends ArticleMixin implements OnInit {
  //URLs
  homeUrl: string;

  //ArticleMixin Variables
  articleData: CampaignObject;
  deleteRoute = {routeName: "campaign-overview", params: {}};
  queryParameterName = "name";

  //CUSTOM VARIABLES
  campaignStatistics: WikiStatistics;

  // Add Members
  addMemberState: boolean = false;
  addAdminState: boolean = false;
  addGuestState: boolean = false;

  memberModel: User;
  memberFormlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericDisableSelect({
      key: "pk", 
      labelProp: "username", 
      sortProp: "username", 
      label: "User",
      overviewType: OverviewType.User,
      disabledExpression: (selectOption: User) => this.isInGroup(selectOption, this.articleData.member_group_name),
      tooltipMessage: "Members typically represent the individual player characters + the GM(s)",
      warningMessage: "The user you selected is already member of this campaign"
    }),
  ];

  adminModel: User;
  adminFormlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericDisableSelect({
      key: "pk", 
      labelProp: "username", 
      sortProp: "username", 
      label: "User",
      overviewType: OverviewType.User,
      disabledExpression: (selectOption: User) => this.isInGroup(selectOption, this.articleData.admin_group_name),
      tooltipMessage: "Keep in mind that being an admin only represents being the one administering this campaign, not being a member of it!",
      warningMessage: "The user you selected is already admin of this campaign"
    }),
  ];

  guestModel: User;
  guestFormlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericDisableSelect({
      key: "pk", 
      labelProp: "username", 
      sortProp: "username", 
      label: "User",
      overviewType: OverviewType.User,
      disabledExpression: (selectOption: User) => {
        const isAdmin = this.isInGroup(selectOption, this.articleData.admin_group_name);
        const isMember = this.isInGroup(selectOption, this.articleData.member_group_name);
        const isGuest = this.isInGroup(selectOption, this.articleData.guest_group_name);
        return isAdmin || isMember || isGuest;
      },
      tooltipMessage: "Keep in mind that there's no point in being a guest when you're already a member or admin.",
      warningMessage: "The user you selected is already guest of this campaign"
    }),
  ];

  // Add Empty Search Response
  addResponseState: boolean = false;
  responseModel: EmptySearchResponse;
  responseFormlyFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "text", placeholder: "Quest Name", maxLength: 400}),
  ]

  constructor(
    warnings: WarningsService,
    route: ActivatedRoute,
    routingService: RoutingService, 
    private formlyService: MyFormlyService, 
    private campaignService: CampaignService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
    private refreshTokenService: RefreshTokenService,
  ) { 
    super(
      campaignService, 
      route, 
      routingService, 
      warnings,
      globalUrlParams,
      tokenService,
    );
  }

  ngOnInit(){
    super.ngOnInit();
    
    this.sortCampaignGroups();

    this.campaignStatistics = this.route.snapshot.data["campaignStatistics"];
    this.updateDynamicVariables(this.campaign, this.articleData, null);
  }

  sortByUsername(entry1: User, entry2: User): number{
    return entry1.username.toLowerCase() > entry2.username.toLowerCase() ? 1 : -1;
  }

  sortCampaignGroups(){
    this.articleData.admins = this.articleData.admins.sort(this.sortByUsername);
    this.articleData.members = this.articleData.members.sort(this.sortByUsername);
    this.articleData.guests = this.articleData.guests.sort(this.sortByUsername);
  }

  updateDynamicVariables(campaign: CampaignOverview, articleData: CampaignObject, params: Params){
    this.homeUrl = this.routingService.getRoutePath('home1', {campaign: articleData.name});
  }

  toggleGuestAddState(): void{
    this.addGuestState = !this.addGuestState;

    if(this.addGuestState){
      this.guestModel = new UserObject();
    }
  }
  
  toggleMemberAddState(): void{
    this.addMemberState = !this.addMemberState;

    if(this.addMemberState){
      this.memberModel = new UserObject();
    }
  }

  toggleAdminAddState(): void{
    this.addAdminState = !this.addAdminState;

    if(this.addAdminState){
      this.adminModel = new UserObject();
    }
  }

  onAddMemberSubmit(): void{
    const memberUpdateObs: Observable<User[]> = this.campaignService.addMember(this.articleData.name, this.memberModel);
    this.updateMembers(memberUpdateObs);
  }

  onAddAdminSubmit(): void{
    const adminUpdateObs: Observable<User[]> = this.campaignService.addAdmin(this.articleData.name, this.adminModel);
    this.updateAdmins(adminUpdateObs);
  }

  onAddGuestSubmit(): void{
    const guestUpdateObs: Observable<User[]> = this.campaignService.addGuest(this.articleData.name, this.guestModel);
    this.updateGuests(guestUpdateObs);
  }

  onRemoveAdmin(user: User): void{
    const adminUpdateObs: Observable<User[]> = this.campaignService.removeAdmin(this.articleData.name, user);
    this.updateAdmins(adminUpdateObs);
  }

  onRemoveMember(user: User): void{
    const memberUpdateObs: Observable<User[]> = this.campaignService.removeMember(this.articleData.name, user);
    this.updateMembers(memberUpdateObs);
  }

  onRemoveGuest(user: User): void{
    const guestUpdateObs: Observable<User[]> = this.campaignService.removeGuest(this.articleData.name, user);
    this.updateGuests(guestUpdateObs);
  }

  removeUserFromList(user:  User, list: User[]): void{
    const userIndex: number = list.indexOf(user);
    list.splice(userIndex, 1);
  }

  updateMembers(updateMemberObs: Observable<User[]>): void{
    updateMemberObs.pipe(first()).subscribe(
      async (members: User[]) => {
        this.articleData.members = members.sort(this.sortByUsername);
        this.addMemberState = false;
        await this.refreshTokenService.refreshUserData().toPromise();
      },
      error => this.warnings.showWarning(error)
    );
  }

  updateAdmins(updateAdminObs: Observable<User[]>): void{
    updateAdminObs.pipe(first()).subscribe(
      async (admins: User[]) => {
        this.articleData.admins = admins.sort(this.sortByUsername);
        this.addAdminState = false;
        await this.refreshTokenService.refreshUserData().toPromise();
      },
      error => this.warnings.showWarning(error)
    );
  }

  updateGuests(updateGuestObs: Observable<User[]>): void{
    updateGuestObs.pipe(first()).subscribe(
      async (guests: User[]) => {
        this.articleData.guests = guests.sort(this.sortByUsername);
        this.addGuestState = false;
        await this.refreshTokenService.refreshUserData().toPromise();
      },
      error => this.warnings.showWarning(error)
    );
  }



  /**
   * @description Checks if a given user is already a member in the current campaign.
   * @returns boolean
   */
  isInGroup(
    selectOption: User, 
    groupName: string,
  ): boolean{    
    const groupsOfUser = selectOption.group_details;
    const isMember = groupsOfUser.some(group => group.name.toLowerCase() === groupName);
    return isMember;
  }

  deleteArticle(){
    throw "You can not delete a campaign, please use 'deactivateCampaign' instead";
  }



  toggleResponseAddState(): void{
    this.addResponseState = !this.addResponseState;

    if(this.addResponseState){
      this.responseModel = {campaign: this.campaign.pk, text: null};
    }
  }

  onAddResponseSubmit(): void{
    this.campaignService.addEmptySearchResponse(this.responseModel)
      .pipe(first())
      .subscribe(
        (emptySearchResponse: EmptySearchResponse) => {
          this.articleData.emptySearchResponses.push(emptySearchResponse);
          this.articleData.emptySearchResponses.sort((response1, response2) => response1 > response2 ? 1 : -1);
        },
        error => this.warnings.showWarning(error)
      );
  }

  onRemoveResponse(emptySearchResponse: EmptySearchResponse): void{
    this.campaignService.deleteEmptySearchResponse(emptySearchResponse.id)
      .pipe(first())
      .subscribe(
        response => {
          const deletedResponseIndex: number = this.articleData.emptySearchResponses.indexOf(emptySearchResponse);
          this.articleData.emptySearchResponses.splice(deletedResponseIndex, 1);
        },
        error => this.warnings.showWarning(error)
      );
  }

  deactivateCampaign(){
    this.campaignService.deactivate(this.articleData.pk).pipe(first()).subscribe(
      response => this.routingService.routeToPath("campaign-overview"),
      error => this.warnings.showWarning(error)
    );
  }

}
