import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private auth: AuthService) {}

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  ngOnInit() {
    this.createForm();
  }

  /**
   * Log into the application
   */
  logIn() {
    this.auth.doLogin(this.loginForm.value).then(res => {
      this.auth.token = res.access_token;
      // Get user data and enter the app
      this.auth.getUser().then(user => {
        this.auth.userData = user;
        // Set user locale
        this.auth.locale = user.locale;
        this.router.navigate(["/content"]);
      });
    });
  }

  private createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required)
    });
  }
}
