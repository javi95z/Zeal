import { User } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentUser: User;

  constructor(public auth: AuthService) {
    this.auth.currentUser.then(res => this.currentUser = res);
  }
  
  logOut() {
    this.auth.doLogout();
  }

}
