import { Component } from '@angular/core';
import { TokenStorageService } from './components/_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private role: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  title = 'Hapy-Company';
  selectedItem: number = 0;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.role;

      this.showAdminBoard = this.role === 'Admin';
      this.showModeratorBoard = this.role === 'manager';

      this.username = user.username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  listClick(newValue: number) {
    this.selectedItem = newValue;
  }
}
