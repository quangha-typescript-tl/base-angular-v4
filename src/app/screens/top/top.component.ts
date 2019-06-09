import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user/user';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-top',
  templateUrl: 'top.component.html',
  styleUrls: ['./top.component.css']
})

export class TopComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
  }

  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }
}
