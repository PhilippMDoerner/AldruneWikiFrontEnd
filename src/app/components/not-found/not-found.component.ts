import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from "src/app/app.constants";
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  constants: any = Constants;

  router: Router;
  constructor(private privateRouter: Router) { }

  ngOnInit(): void {
    this.router = this.privateRouter;
  }

}
