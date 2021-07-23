import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  admin: boolean = false;
  currentUser: User;
  submitValue: string = 'Add';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.firstName) {
      alert('Please enter a first name');
      return;
    } else if (!this.lastName) {
      alert('Please enter a last name');
      return;
    } else if (!this.email) {
      alert('Please enter an email');
      return;
    } else if (!this.password) {
      alert('Please enter a password');
      return;
    }
    if ((this.submitValue == 'Add')) {
      this.submitValue = 'Confirm';
      return;
    }
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      created: new Date().toString(),
      admin: this.admin,
    };
    this.userService.addUser(newUser).subscribe(() => {
      this.router.navigate(['/users'], { replaceUrl: true });
    });
  }
}
