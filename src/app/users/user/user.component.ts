// User Component
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.fetchUser(userId);
    })
  }

  fetchUser(userId: number): void {
    const editedUsers = JSON.parse(localStorage.getItem('editedUsers') || '[]');
    const localUser = editedUsers.find(u => u.id === userId);

    if(localUser) {
      this.user = localUser;
    } else {
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
      },
      error => {
        console.log('Error fetching user:', error);
      }
    )
    }
  }
}
