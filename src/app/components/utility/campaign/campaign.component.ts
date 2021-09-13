import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { OverviewType } from 'src/app/app.constants';
import { CampaignObject } from 'src/app/models/campaign';
import { User, UserObject } from 'src/app/models/user';
import { CampaignService } from 'src/app/services/campaign.service';
import { GlobalUrlParamsService } from 'src/app/services/global-url-params.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
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
  //ArticleMixin Variables
  articleData: CampaignObject;
  deleteRoute = {routeName: "campaign-overview", params: {}};
  queryParameterName = "name";

  //CUSTOM VARIABLES
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
      tooltipMessage: "",
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
      disabledExpression: (selectOption: User) => {
        return this.isInGroup(selectOption, this.articleData.admin_group_name);
      },
      tooltipMessage: "",
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
      tooltipMessage: "",
      warningMessage: "The user you selected is already guest of this campaign"
    }),
  ];


  constructor(
    warnings: WarningsService,
    route: ActivatedRoute,
    routingService: RoutingService, 
    private formlyService: MyFormlyService, 
    private campaignService: CampaignService,
    globalUrlParams: GlobalUrlParamsService,
    tokenService: TokenService,
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
      (members: User[]) => {
        this.articleData.members = members;
        this.addMemberState = false;
      },
      error => this.warnings.showWarning(error)
    );
  }

  updateAdmins(updateAdminObs: Observable<User[]>): void{
    updateAdminObs.pipe(first()).subscribe(
      (admins: User[]) => {
        this.articleData.admins = admins;
        this.addAdminState = false;
      },
      error => this.warnings.showWarning(error)
    );
  }

  updateGuests(updateGuestObs: Observable<User[]>): void{
    updateGuestObs.pipe(first()).subscribe(
      (guests: User[]) => {
        this.articleData.guests = guests;
        this.addGuestState = false;
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

  deactivateCampaign(){
    this.campaignService.deactivate(this.articleData.pk).pipe(first()).subscribe(
      response => this.routingService.routeToPath("campaign-overview"),
      error => this.warnings.showWarning(error)
    );
  }

}
