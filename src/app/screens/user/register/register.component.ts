import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    // private alertService: AlertService
  ) { }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        error => {
          alert('error');
          this.loading = false;
        });
  }
}
