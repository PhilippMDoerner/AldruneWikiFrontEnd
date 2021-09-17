import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

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
