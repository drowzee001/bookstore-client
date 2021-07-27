import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/User';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  faTrashCan = faTrashAlt;
  faEdit = faEdit;
  currentUser: User;
  loading: boolean = true;
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.loading = false;
    });
  }

  addClick() {
    this.router.navigate(['/addUser']);
  }
  
  deleteClick(user: User) {
    this.userService
      .deleteUser(user)
      .subscribe(
        () => (this.users = this.users.filter((u) => u._id !== user._id))
      );
  }
  timeFormat(date: string): string {
    return new Date(date).toDateString().toString();
  }
}
