import { Component } from '@angular/core';
import { User } from '../_model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public model: any = {}
  constructor() {

  }
  ngOnInit(): void {

  }

  register() {
    console.log(this.model);
  }

  cancel() {
    console.log("cancelled");
  }

}
