import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/app.constants';
import { RoutingService } from 'src/app/services/routing.service';

@Component({
  selector: 'app-wiki1-request',
  templateUrl: './wiki1-request.component.html',
  styleUrls: ['./wiki1-request.component.scss']
})
export class Wiki1RequestComponent{
  constants: any = Constants;

  constructor(
    public routingService: RoutingService,
  ) { }
}
