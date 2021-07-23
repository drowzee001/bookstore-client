import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/User';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.user;
  }

  ngOnInit(): void {
  }
}
