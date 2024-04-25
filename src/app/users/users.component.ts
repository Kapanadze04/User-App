import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit {
  users: any[] = [];
  displayedUsers: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  pages: number[] = [];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log(response.users);
        this.users = response.users;
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.updateDisplayedUsers();
        // this.generatePageNumbers();
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  updateDisplayedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.users.slice(startIndex, endIndex);
  }

  generatePageNumbers(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number):void {
    if(page >=1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedUsers();
    }
  }

  nextPage(): void {
    if(this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  previousPage(): void {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }
}




// export class UsersComponent implements OnInit {


//   users: any[] = [];

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.userService.getUsers().subscribe({
//       next: (response) => {
//         console.log(response.users);
//         this.users = response.users;
//       },
//       error: (err) => console.error('Error fetching users:', err)
//     })
//   }


// }






