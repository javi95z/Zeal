import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    return true;
  }

  doLogin() {

  }
}

// private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

// get isLoggedIn() {
//   return this.loggedIn.asObservable();
// }

// constructor(
//   private router: Router
// ) {}

// login(user: User) {
//   if (user.userName !== '' && user.password !== '' ) {
//     this.loggedIn.next(true);
//     this.router.navigate(['/']);
//   }
// }

// logout() {
//   this.loggedIn.next(false);
//   this.router.navigate(['/login']);
// }
