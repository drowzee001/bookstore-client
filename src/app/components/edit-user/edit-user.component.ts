import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  user: User;
  currentUser: User;
  faEdit = faEdit;
  submitValue: string = 'Update';
  loading: boolean = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userService.getUser(params['id']).subscribe((user) => {
        this.user = user;
        this.user.password = 'thisisaplaceholder';
        this.loading = false;
      });
    });
  }

  onSubmit() {
    if (this.user.firstName == '') {
      alert('Please enter a first name');
      return;
    } else if (this.user.lastName == '') {
      alert('Please enter a last name');
      return;
    } else if (this.user.email == '') {
      alert('Please enter a email');
      return;
    } else if (this.user.password == '') {
      alert('Please enter a password');
      return;
    }
    if (this.submitValue == 'Update') {
      this.submitValue = 'Confirm';
      return;
    }
    if (this.user.password == 'thisisaplaceholder') {
      this.user.password = undefined;
    }
    this.userService.editUser(this.user).subscribe(() => {
      this.router.navigate(['/users'], { replaceUrl: true });
    });
  }
}
