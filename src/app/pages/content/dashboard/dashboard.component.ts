import { Component, OnInit } from "@angular/core";
import { ApiService, AuthService } from "@services";
import { User } from "@models";

@Component({
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(private auth: AuthService, private api: ApiService<User>) {}

  ngOnInit() {
    this.auth.currentUser.then((e) => {
      this.api.getOne("users", e.id).then((o) => (this.user = o.data));
    });
  }
}