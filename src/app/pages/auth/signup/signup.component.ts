import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService, InitService } from "@services";
import { AUTH_TEXTS } from "@zeal/dict";
import { GENDER } from "@zeal/variables";

@Component({
  templateUrl: "./signup.component.html",
})
export class SignupComponent implements OnInit {
  dict = AUTH_TEXTS;
  genderOpts = GENDER;
  signupForm: FormGroup;

  constructor(private auth: AuthService, private init: InitService) {}

  get f() {
    return this.signupForm.controls;
  }

  ngOnInit() {
    this.createForm();
  }

  /**
   * Sign up new user
   */
  signUp() {
    this.auth.doSignUp(this.signupForm.value).then((o) => {
      if (!o) return;
      const loginData = {
        email: this.f.email.value,
        password: this.f.password.value,
      };
      this.auth.doLogin(loginData).then((res) => {
        if (!res) return;
        this.init.initAppRequests();
      });
    });
  }

  private createForm() {
    this.signupForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      name: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      gender: new FormControl(""),
    });
  }
}
