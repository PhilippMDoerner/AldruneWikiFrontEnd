import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserObject } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { WarningsService } from 'src/app/services/warnings.service';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {
  @Input() user: UserObject;
  @Input() index: number;

  @Output() delete: EventEmitter<number> = new EventEmitter();

  isDeleteState: boolean = false;

  constructor(
    private userService: UserService,
    private warnings: WarningsService
  ) { }

  ngOnInit(): void {
  }

  updateUser(): void{
    this.userService.updateUser(this.user).pipe(first()).subscribe(
      (updatedUser: UserObject) => this.user = updatedUser,
      error => this.warnings.showWarning(error)
    )
  }

  toggleDeleteState(): void{
    this.isDeleteState = !this.isDeleteState;
  }

  deleteUser(userIndex: number): void{
    this.userService.deleteUser(this.user.pk).pipe(first()).subscribe(
      (response) => {this.delete.emit(this.index)},
      error => this.warnings.showWarning(error)
    )
  }
}
