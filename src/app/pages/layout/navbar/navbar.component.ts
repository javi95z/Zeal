import { User } from './../../../models/user';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: User;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.auth.currentUser;
  }

}
