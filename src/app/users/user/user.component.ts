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

  constructor(private route: ActivatedRoute,
              private userService: UserService
  ) {}

  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
      })
    })
  }
}
