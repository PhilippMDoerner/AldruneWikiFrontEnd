import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';


@Component({
  selector: 'app-gateway-timeout',
  templateUrl: './gateway-timeout.component.html',
  styleUrls: ['./gateway-timeout.component.scss']
})
export class GatewayTimeoutComponent {
  constants: any = Constants;

  constructor(
    public routingService: RoutingService,
  ) { }
}
