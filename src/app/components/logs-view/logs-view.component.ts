import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-logs-view',
  templateUrl: './logs-view.component.html',
  styleUrls: ['./logs-view.component.css'],
})
export class LogsViewComponent implements OnInit {
  Page: number = 1;
  PageSize: number = 10;
  logs: string[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getLogs(1);
  }

  getLogs(page: number) {
    this.dashboardService.getLogs(page - 1, this.PageSize).subscribe({
      next: (data) => {
        this.Page = page;
        this.logs = this.logs.concat(data.items);
      },
      error: (err) => {},
    });
  }
}
