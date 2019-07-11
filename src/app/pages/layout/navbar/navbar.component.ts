import { Component } from '@angular/core';
import { AuthService } from '../../../services';

@Component({
  selector: 'z-navbar',
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
