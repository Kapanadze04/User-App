import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {


  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log(response.users);
        this.users = response.users;
      },
      error: (err) => console.error('Error fetching users:', err)
    })
  }


}