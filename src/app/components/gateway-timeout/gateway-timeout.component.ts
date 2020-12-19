import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';


@Component({
  selector: 'app-gateway-timeout',
  templateUrl: './gateway-timeout.component.html',
  styleUrls: ['./gateway-timeout.component.scss']
})
export class GatewayTimeoutComponent implements OnInit {
  constants: any = Constants;
  router: Router;

  constructor(
    private privateRouter: Router
  ) { }

  ngOnInit(): void {
    this.router = this.privateRouter;
  }

}
