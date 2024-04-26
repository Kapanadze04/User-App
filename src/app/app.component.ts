import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  onSearch(searchTerm: string) {
    console.log('Searching for:', searchTerm);
  }

  
}