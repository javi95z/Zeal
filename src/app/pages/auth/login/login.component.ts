import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError = false;

  constructor(
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  /**
   * Log into the application
   */
  logIn() {
    this.auth.doLogin(this.loginForm.value)
        .then(res => {
          sessionStorage.setItem('token', res.access_token);
          // Get user data and enter the app
          this.auth.getUser().then(res => {
            this.auth.userData = res;
            this.router.navigate(['/content']);
          });
        }, rej => this.loginError = rej.error);
  }

}
