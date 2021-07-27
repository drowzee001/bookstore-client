import {
  animate,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '100vh',
        })
      ),
      state('closed', style({})),
      transition('open => closed', [animate('100ms ease-in')]),
      transition('closed => open', [animate('200ms ease-out')]),
    ]),
    trigger('openClose2', [
      state(
        'open',
        style({
          visibility: 'visible',
        })
      ),
      state('closed', style({})),
    ]),
    trigger('openClose3', [
      state('open', style({ transform: 'rotate(-90deg)' })),
      state('closed', style({})),
      transition('open => closed', [animate('100ms')]),
      transition('closed => open', [animate('200ms')]),
    ]),
  ],
})
export class NavComponent implements OnInit {
  faBars = faBars;
  isOpen = false;

  @Input() admin: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  menu(): void {
    this.isOpen = !this.isOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
