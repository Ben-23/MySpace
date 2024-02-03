import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode = false;

  constructor() { }

  ngOninit(): void { }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
}
