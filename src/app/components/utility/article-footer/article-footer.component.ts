import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-article-footer',
  templateUrl: './article-footer.component.html',
  styleUrls: ['./article-footer.component.scss']
})
export class ArticleFooterComponent implements OnInit {
  @Input() link: string;
  @Input() label: string;
  @Input() clickEmissionValue: any;
  @Input() deleteMessage: string;
  @Input() showDelete: boolean = true;
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void{
    if(!this.label) throw "You did not provide a label for a grid-button"
  }

  onClick(): void{
    if (this.clickEmissionValue) this.buttonClick.emit(this.clickEmissionValue);

    this.buttonClick.emit();
  }

  onDelete(): void{
    this.delete.emit();
  }

}
