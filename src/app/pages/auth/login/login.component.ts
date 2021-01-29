import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService, InitService } from "@services";
import { AUTH_TEXTS } from "@zeal/dict";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  dict = AUTH_TEXTS;
  loginForm: FormGroup;

  constructor(private auth: AuthService, private init: InitService) {}

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.createForm();
  }

  /**
   * Log into the application
   */
  logIn() {
    this.auth
      .doLogin(this.loginForm.value)
      .then((res) => {
        if (!res) return;
        this.init.initAppRequests();
      })
      .catch(() => this.loginForm.reset());
  }

  private createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }
}
