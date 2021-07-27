import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  firstName: string;
  lastName: string;
  passwordConfirm: string;

  returnUrl: string;

  loginShow: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
  ) {
    authService.loadToken();
    if (this.authService.token) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginSubmit() {
    if (!this.email) {
      alert('Please enter an email address');
      return;
    }
    if (!this.password) {
      alert('Please enter a password');
      return;
    }
    this.authService.login(this.email, this.password).subscribe(
      (res) => {
        this.authService.storeUserData(res['token'], res['user']);
        this.router.navigate([this.returnUrl]);
      },
      (err) => alert(err.error.msg)
    );
  }

  registerSubmit() {
    if (!this.firstName) {
      alert('Please enter a first name');
      return;
    }
    if (!this.lastName) {
      alert('Please enter a last name');
      return;
    }
    if (!this.email) {
      alert('Please enter an email address');
      return;
    }
    if (!this.password) {
      alert('Please enter a password');
      return;
    }
    if (!this.passwordConfirm) {
      alert('Please confirm password');
      return;
    }
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      created: new Date().toString(),
      admin: false,
    };

    this.authService.register(newUser).subscribe(
      (res) => {
        this.authService.storeUserData(res['token'], res['user']);
        this.router.navigate([this.returnUrl]);
      },
      (err) => alert(err.error.msg)
    );
  }

  goToRegister() {}
}
