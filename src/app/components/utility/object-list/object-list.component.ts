import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})
export class ObjectListComponent implements OnInit {
  constants: any = Constants;
  @Input() heading: string;
  @Input() items: {'name': string}[];
  @Input() articleType: string;
  @Input() createLink: string = "";

  constructor() { }

  ngOnInit(): void {
    if (this.createLink === "") this.createLink = `${Constants.wikiUrlFrontendPrefix}/${this.articleType}/create`;
    
  }

}
