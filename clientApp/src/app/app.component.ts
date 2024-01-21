import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './_services/account.service';
import { User } from './_model/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';
  users: any;
  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers() {
    this.http.get("http://localhost:5114/api/user").subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log("Success"),
    });
  }
  setCurrentUser() {
    const userString = localStorage.getItem("user");
    if (!userString)
      return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
