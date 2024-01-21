import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  loggedIn = false;
  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: Response => {
        console.log(Response);
        this.loggedIn = true
      },
      error: error => console.log(error)
    })
  }
  logout() {
    this.loggedIn = false;
  }
}
