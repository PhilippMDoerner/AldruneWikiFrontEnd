import { Component, OnInit } from '@angular/core';
import { Constants } from "src/app/app.constants";
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constants: any = Constants;
  constructor() { }

  ngOnInit(): void {
  }

}
