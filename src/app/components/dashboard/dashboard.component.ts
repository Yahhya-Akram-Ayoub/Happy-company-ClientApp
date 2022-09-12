import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  currentTab: number = 0;
  PageSize: number = 10;
  Pages: number = 1;
  Page: number = 1;
  warehouses: any[] = [];
  items: any[] = [];
  Asc: boolean = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getwarehouses(this.Page);
  }

  getwarehouses(_page: number) {
    this.dashboardService.getWarehouses(_page - 1, this.PageSize).subscribe({
      next: (data) => {
        this.Page = _page;
        this.Pages = Math.ceil(data.count / this.PageSize);
        this.warehouses = [...data.warehouses];
      },
      error: (err) => {},
    });
  }
  getItems(_page: number) {
    this.dashboardService
      .getItems(_page - 1, this.PageSize, this.Asc)
      .subscribe({
        next: (data) => {
          this.Page = _page;
          this.Pages = Math.ceil(data.count / this.PageSize);
          this.items = [...data.items];
        },
        error: (err) => {},
      });
  }

  createRange(number: number) {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }
  changeTab(tab: number) {
    this.currentTab = tab;
    if (tab === 0) {
      this.getwarehouses(1);
    } else {
      this.getItems(1);
    }
  }
  asc() {
    this.Asc = !this.Asc;
    this.getItems(1);
  }
}
