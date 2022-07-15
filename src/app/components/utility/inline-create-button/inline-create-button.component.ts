import { Component, Input, OnInit } from '@angular/core';

enum BadgeStyle{
  Link,
  Text
}

@Component({
  selector: 'app-inline-create-button',
  templateUrl: './inline-create-button.component.html',
  styleUrls: ['./inline-create-button.component.scss']
})
export class InlineCreateButtonComponent implements OnInit{
  constructor() { }
  
  @Input() link: string;
  @Input() labelText: string;
  badgeStyle: BadgeStyle;

  styles = BadgeStyle;

  ngOnInit(): void{
    this.badgeStyle = this.link == null ? BadgeStyle.Text : BadgeStyle.Link;
  }
}
