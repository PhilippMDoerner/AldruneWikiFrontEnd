import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { TokenService } from 'src/app/services/token.service';
import { PermissionUtilityFunctionMixin } from 'src/app/utils/functions/permissionDecorators';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent extends PermissionUtilityFunctionMixin implements OnInit {
  constants: any = Constants;
  @Input() heading: string;
  @Input() items: {'name': string}[];
  @Input() articleType: string;
  @Input() createLink: string = "";

  constructor(    
    route: ActivatedRoute,
    tokenService: TokenService,
  ) { 
    super(tokenService, route);
  }

  ngOnInit(): void {
    if (this.createLink === "") this.createLink = `${Constants.wikiUrlFrontendPrefix}/${this.articleType}/create`;
    
  }

}
