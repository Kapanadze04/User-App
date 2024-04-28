import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
// import { PaginationService } from './pagination.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit{
  users: any[] = [];
  displayedUsers: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  pages: number[] = [];
  displayedCountText: string = '';
  isUserSelected: boolean = false;
  editingUser: any = null;


  constructor(private userService: UserService, private router: Router) {}


  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.users;
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.updateDisplayedUsers();
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }
  
  openEditModal(): void {
    const selectedUser = this.displayedUsers.find(user => user.isSelected);
    if(selectedUser) {
      this.editingUser = JSON.parse(JSON.stringify(selectedUser))
    }
  }
  
  closeEditModal(): void {
    this.users.forEach(users => users.isSelected = false);
    this.editingUser = null;
    this.isUserSelected = false;
  }
  
  saveChanges(updateUser: any): void {
    let originalUser = this.users.find(u => u.id === updateUser.id);
    
    if(originalUser) {
      Object.assign(originalUser, updateUser);
    }
    // this.closeEditModal();
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
    if (searchTerm.trim() === '') {
      this.updateDisplayedUsers();
    } else {
      const searchTerms = searchTerm.toLowerCase().trim().split(/\s+/);
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      const usersOnCurrentPage = this.users.slice(startIndex, endIndex);

      const filteredUsers = usersOnCurrentPage.filter(user =>
        searchTerms.every(term =>
          user.firstName.toLowerCase().includes(term) ||
          user.lastName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
        )
      );
  
      
      this.displayedUsers = filteredUsers;
    }
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }

  updateDisplayedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.users.slice(startIndex, endIndex);


    const displayedCount = this.displayedUsers.length;
    const totalCount = this.users.length;
    this.displayedCountText = `ნაჩვენებია  ${startIndex + displayedCount} შედეგი -  ${totalCount} შედეგიდან`
  }

  paginate(page: number):void {
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