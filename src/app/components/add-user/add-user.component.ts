import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  form: any = {
    fullName: null,
    password: null,
    role: null,
    email: null,
    active: true,
  };
  isLoggedIn = false;
  roles: any[] = [];
  id: string | null = '';

  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getRoles();

    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    if (!!this.id) {
      this.usersService.getUser(this.id).subscribe({
        next: (data) => {
          this.form = data.user;
        },
        error: (err) => {},
      });
    }
  }

  getRoles() {
    this.usersService.getRoles().subscribe({
      next: (data) => {
        this.roles = [...data.roles];
      },
      error: (err) => {},
    });
  }

  onSubmit(): void {
    this.usersService.register(this.form).subscribe({
      next: (data) => {
        this.router.navigate(['Users']);
      },
      error: (err) => {},
    });
  }
}
