import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

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
    this.getCurrentUser();
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
    this.accountService.logout();
  }
  getCurrentUser() {
    this.accountService.currentUser$.subscribe(
      {
        next: user => this.loggedIn = !!user,
        error: error => console.log(error)
      }
    )
  }
}
