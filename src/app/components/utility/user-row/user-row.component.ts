import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { PermissionGroup } from 'src/app/models/group';
import { UserObject } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {
  @Input() user: UserObject;
  @Input() index: number;
  @Input() groups: PermissionGroup[];


  @Output() delete: EventEmitter<number> = new EventEmitter();

  //USER VARIABLES
  @ViewChild('isSUInput') suInput: ElementRef;
  @ViewChild('isAdminInput') adminInput: ElementRef;

  isDeleteState: boolean = false;

  //GROUP VARIABLES
  isAddGroupstate: boolean = false;
  newGroup: number = null;
  

  constructor(
    private userService: UserService,
    private warnings: WarningsService,
    public tokenService: TokenService,
  ) { }

  ngOnInit(): void {
  }

  updateUser(): void{
    this.userService.update(this.user.pk, this.user).pipe(first()).subscribe(
      (updatedUser: UserObject) => this.user = updatedUser,
      error => this.warnings.showWarning(error)
    )
  }

  //GROUPS
  isUserInGroup(groupPk: number): boolean{
    return this.user.groups.includes(groupPk);
  }

  getGroupName(pk: number): string{
    const groupsWithPk: PermissionGroup[] = this.groups.filter((group) => group.id === pk);
    const hasNoGroupWithPk = groupsWithPk.length === 0;
    return (hasNoGroupWithPk) ? "" : groupsWithPk[0].name;
  }

  removeUserFromGroup(groupPk: number): void{
    const groupIndex: number = this.user.groups.indexOf(groupPk);
    this.user.groups.splice(groupIndex, 1);
    this.updateUserGroups();
  }

  addUserToSelectedGroup(groupPk: number | string): void{
    groupPk = (typeof groupPk ==="string") ? parseInt(groupPk) : groupPk;
    this.user.groups.push(groupPk);
    this.updateUserGroups();
  }

  updateUserGroups(){
    this.userService.updateUserGroups(this.user).pipe(first()).subscribe(
      (updatedUser: UserObject) => {
        this.user = updatedUser;
        this.isAddGroupstate = false;
      },
      error => this.warnings.showWarning(error)
    );
  }

  toggleGroupAddState(): void{
    this.isAddGroupstate = !this.isAddGroupstate;

    if(this.isAddGroupstate){
      this.newGroup = null;
    }
  }

  toggleDeleteState(): void{
    this.isDeleteState = !this.isDeleteState;
  }

  deleteUser(userIndex: number): void{
    this.userService.delete(this.user.pk).pipe(first()).subscribe(
      (response) => {this.delete.emit(this.index)},
      error => this.warnings.showWarning(error)
    )
  }
}
