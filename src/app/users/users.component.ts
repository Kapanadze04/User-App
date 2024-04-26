import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';



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

  displayedCountText: string = '';
  isUserSelected: boolean = false;



  constructor(private userService: UserService,
              private router: Router
  ) {}
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
  
  goToUserDetail(userId: number): void {
    this.router.navigate(['user', userId]);
  }

  toggleUserSelection(user: any): void {
    if(user.isSelected) {
      user.isSelected = false;
    } else {
      this.users.forEach(u => u.isSelected = false);
      user.isSelected = true;
    } 
    this.isUserSelected = this.users.some(u => u.isSelected);
  }

  searchUsers(searchTerm: string): void {
    if(searchTerm.trim() === '') {
      this.displayedUsers = this.users.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    } else {
      this.displayedUsers = this.users
        .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
        .map(user => {
          const firstNameMatch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase());
          const lastNameMatch = user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
          const emailMatch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
          const isMatch = firstNameMatch || lastNameMatch || emailMatch;
        return { ...user, isMatch };
        })
    }

    
  }



  updateDisplayedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.users.slice(startIndex, endIndex);


    const displayedCount = this.displayedUsers.length;
    const totalCount = this.users.length;
    this.displayedCountText = `ნაჩვენებია  ${startIndex + displayedCount} შედეგი -  ${totalCount} შედეგიდან`
  }

  generatePageNumbers(): void {
    this.pages = Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  goToPage(page: number):void {
    if(page >=1 && page <= this.totalPages) {

      this.users.forEach(u => u.isSelected = false);
      this.isUserSelected = false;

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










