import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { TokenService } from 'src/app/services/token.service';
import { CurrentUserHasPermissions, hasPermissions, PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-edit-toggle',
  templateUrl: './edit-toggle.component.html',
  styleUrls: ['./edit-toggle.component.scss']
})
export class EditToggleComponent extends PermissionUtilityFunctionMixin{
  @Input() link: string = "update";
  @Input() isInUpdateState: boolean = false;
  
  constructor(
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(tokenService, route);
  }
}
