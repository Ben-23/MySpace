import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../_model/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @Input() userList: any;
  @Output() eventEmitter = new EventEmitter();
  public model: any = {}
  constructor(private accountService: AccountService) {

  }

  ngOnInit(): void {

  }

  register() {
    this.accountService.register(this.model).subscribe({
      next: Response => {
        console.log(Response);
      },
      error: error => console.log(error)
    })
  }

  cancel() {
    this.eventEmitter.emit(false);
  }

}
