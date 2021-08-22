import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { PermissionGroup } from 'src/app/models/group';
import { User, UserObject } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { GroupService } from 'src/app/services/group.service';
import { MyFormlyService } from 'src/app/services/my-formly.service';
import { RoutingService } from 'src/app/services/routing.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { WarningsService } from 'src/app/services/warnings.service';
import { animateElement } from 'src/app/utils/functions/animationDecorator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('adminCard') adminCard: ElementRef;
  parameterSubscription: Subscription;
  campaign: string;

  // USER VARIABLES
  users: UserObject[];

  isUserCreateState : boolean = false;
  
  userModel: User;
  userFields: FormlyFieldConfig[] = [
    this.formlyService.genericInput({key: "username", isNameInput: true, required: true}),
    this.formlyService.confirmedPasswordInput({}),
    this.formlyService.genericInput({key: "email", isNameInput: true, required: false}),
  ];

  //GROUP VARIABLES
  groups: PermissionGroup[];

  //DATABASE VARIABLES
  statistics: any;
  databaseDeleteConfirmationCount: number = 0;

  constructor(
    private userService: UserService,
    private warnings: WarningsService,
    private formlyService: MyFormlyService,
    private adminService: AdminService,
    public routingService: RoutingService,
    private groupService: GroupService,
    public tokenService: TokenService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.parameterSubscription = this.route.params.subscribe(
      params => this.campaign = params.campaign,
      error => this.warnings.showWarning(error)
    );

    this.userService.list().pipe(first()).subscribe(
      (users: UserObject[]) => {
        this.users = users.sort((user1 :UserObject, user2: UserObject) => {
          const username1: string = user1.username.toLocaleLowerCase();
          const username2: string = user2.username.toLocaleLowerCase();
          return (username1 < username2) ? -1 : 1;
        });
      },
      error => this.warnings.showWarning(error)
    );

    this.groupService.list().pipe(first()).subscribe(
      (groups: PermissionGroup[]) => this.groups = groups,
      error => this.warnings.showWarning(error)
    );

    this.adminService.getStatistics().pipe(first()).subscribe(
      statisticsData => this.statistics = statisticsData,
      error => this.warnings.showWarning(error)
    );
  }

  ngAfterViewInit(): void{
    animateElement(this.adminCard.nativeElement, 'zoomIn');
  }

  //USERS
  saveNewUser(){
    this.userService.create(this.userModel).pipe(first()).subscribe(
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
      this.userModel = {username: null, email: ""};
    }
  }

  removeDeletedUser(index: number){
    this.users.splice(index, 1);
  }

  //DATABASE
  startDatabaseDownload(): void{
    this.adminService.downloadDatabase().pipe(first()).subscribe(
      (dataBlob: Blob) => {
        const a = document.createElement('a')
        
        const blobAsFileUrl = URL.createObjectURL(dataBlob)
        a.href = blobAsFileUrl
        a.download = 'db.sqlite3';
        a.click();
        URL.revokeObjectURL(blobAsFileUrl);
      },
      error => this.warnings.showWarning(error)
    )
  }

  blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob; //Needed to get past TypeScripts "Blob" data-type annotation
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  progressClearDatabaseState(): void{
    this.databaseDeleteConfirmationCount ++;

    const confirmationCountForDeletion = 5;
    if(this.databaseDeleteConfirmationCount === confirmationCountForDeletion){
      this.clearDatabase();
      this.databaseDeleteConfirmationCount = 0;
    } 
  }

  clearDatabase(): void{
    this.adminService.clearDatabase().pipe(first()).subscribe(
      (response) => this.routingService.routeToPath('home1', {campaign: this.campaign}),
      error => this.warnings.showWarning(error)
    )
  }

  ngOnDestroy(): void{
    if (this.parameterSubscription) this.parameterSubscription.unsubscribe();
  }

}
