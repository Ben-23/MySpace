import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { User } from '../_model/user';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'http://localhost:5114/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'user/login', model).pipe(
      map((response: User) => {
        const user = response;
        localStorage.setItem("user", JSON.stringify(user));
      })
    )
  }

  logout() {
    localStorage.removeItem("user");

  }
}
