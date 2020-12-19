import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';

@Component({
  selector: 'app-wiki1-request',
  templateUrl: './wiki1-request.component.html',
  styleUrls: ['./wiki1-request.component.scss']
})
export class Wiki1RequestComponent implements OnInit {
  constants: any = Constants;
  router: Router;

  constructor(
    private privateRouter: Router
  ) { }

  ngOnInit(): void {
    this.router = this.privateRouter;
  }

}
