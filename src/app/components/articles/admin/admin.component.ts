import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { first } from 'rxjs/operators';
import { User, UserObject } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { UserService } from 'src/app/services/user.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild('adminCard') adminCard: ElementRef;

  // USER VARIABLES
  users: UserObject[];

  isUserCreateState : boolean = false;
  
  userModel: User;
  userFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "username", isNameInput: true, required: true}),
    this.formlyService.confirmedPasswordInput({key: "password", required: true}),
    // this.formlyService.genericInput({key: "password", isPasswordInput: true, required: true}),
    // this.formlyService.genericInput({key: "password2", label: "Repeat Password", isPasswordInput: true, required: true}),
    this.formlyService.genericInput({key: "email", isNameInput: true, required: false}),
  ];

  //DATABASE VARIABLES
  databaseDeleteConfirmationCount: number = 0;

  constructor(
    private userService: UserService,
    private warnings: WarningsService,
    private formlyService: MyFormlyService,
    private adminService: AdminService,
    private routingService: RoutingService,
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().pipe(first()).subscribe(
      (users: UserObject[]) => {
        this.users = users.sort((user1 :UserObject, user2: UserObject) => {
          const username1: string = user1.username.toLocaleLowerCase();
          const username2: string = user2.username.toLocaleLowerCase();
          return (username1 < username2) ? -1 : 1
        });
      },
      error => this.warnings.showWarning(error)
    )
  }

  ngAfterViewInit(): void{
    animateElement(this.adminCard.nativeElement, 'zoomIn');
    console.log(this.users); //TODO: Remove this later
  }


  saveNewUser(){
    this.userService.addUser(this.userModel).pipe(first()).subscribe(
      (newUser: UserObject) => {
        this.users.push(newUser);
        this.isUserCreateState = false;
      },
      error => this.warnings.showWarning(error)
    );
  }

  toggleUserCreateState(){
    this.isUserCreateState = !this.isUserCreateState;

    if(this.isUserCreateState){
      this.userModel = {username: null, groups:[], email: null};
    }
  }

  removeDeletedUser(index: number){
    this.users.splice(index, 1);
  }

  startDatabaseDownload(): void{

  }

  progressClearDatabaseState(): void{
    this.databaseDeleteConfirmationCount ++;

    const confirmationCountForDeletion = 5;
    if(this.databaseDeleteConfirmationCount === confirmationCountForDeletion){
      this.clearDatabase();
    } 
  }

  clearDatabase(): void{
    this.adminService.clearDatabase().pipe(first()).subscribe(
      (response) => this.routingService.routeToPath('home'),
      error => this.warnings.showWarning(error)
    )
  }

}
