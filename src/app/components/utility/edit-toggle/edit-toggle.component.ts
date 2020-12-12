import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { CurrentUserHasPermissions, hasPermissions, PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-edit-toggle',
  templateUrl: './edit-toggle.component.html',
  styleUrls: ['./edit-toggle.component.scss']
})
export class EditToggleComponent extends PermissionUtilityFunctionMixin implements OnInit {
  @Input() link: string = "update";
  @Input() isInUpdateState: boolean = false;
  
  constructor(
    private router: Router,
  ){ super() }

  ngOnInit(): void {
  }
}
