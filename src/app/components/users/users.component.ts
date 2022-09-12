import { Component, EventEmitter, OnInit } from '@angular/core';
import { UsersService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  form: any = {
    currPass: null,
    newPass: null,
  };
  role: string = '';
  users: any[] = [];
  Pages: number = 1;
  Page: number = 1;
  PageSize: number = 10;
  UserDeleted: any = {};
  ChangePassUser: any = null;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService,
    private usersService: UsersService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getUsers(this.Page);

    let user = this.tokenStorageService.getUser();
    this.role = user.role;
  }

  createRange(number: number) {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  getUsers(_page: number) {
    this.usersService.getUsers(_page - 1, this.PageSize).subscribe({
      next: (data) => {
        this.Page = _page;
        this.Pages = Math.ceil(data.count / this.PageSize);
        this.users = [...data.users];
      },
      error: (err) => {},
    });
  }

  openDeleteModal(content: any, user: any) {
    this.ChangePassUser = false;
    this.modalService.open(content);
    this.UserDeleted = user;
  }

  openPasswordModal(content: any, userId: string) {
    this.form = { currPass: null, newPass: null };
    this.ChangePassUser = [...this.users.filter((x) => x.id == userId)][0];
    this.modalService.open(content);
  }

  deleteUser(_userId: string) {
    this.usersService.deleteUser(_userId).subscribe({
      next: (data) => {
        this.getUsers(this.Page);
      },
      error: (err) => {},
    });
  }

  submitChangePass(): void {
    const { currPass, newPass } = this.form;
    this.usersService
      .changePass(this.ChangePassUser.id, currPass, newPass)
      .subscribe({
        next: (data) => {},
        error: (err) => {},
      });
  }
}
