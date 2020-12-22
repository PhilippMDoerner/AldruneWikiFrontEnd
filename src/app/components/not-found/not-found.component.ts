import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from "src/app/app.constants";
import { RoutingService } from 'src/app/services/routing.service';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent{
  constants: any = Constants;

  constructor(
    public routingService: RoutingService,
  ) { }
}
