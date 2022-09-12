import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../_services/warehouse.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css'],
})
export class WarehouseComponent implements OnInit {
  PageSize: number = 10;
  Pages: number = 1;
  Page: number = 1;
  warehouses: any[] = [];
  warehouseDeleted: any = null;

  constructor(
    private modalService: NgbModal,
    private warehouseService: WarehouseService
  ) {}

  ngOnInit(): void {
    this.getwarehouses(this.Page);
  }

  openDeleteModal(content: any, user: any) {
    this.modalService.open(content);
    this.warehouseDeleted = user;
  }

  deletewarehouse(id: string) {
    this.warehouseService.deletewarehouse(id).subscribe({
      next: (data) => {
        this.getwarehouses(this.Page);
      },
      error: (err) => {},
    });
  }
  getwarehouses(_page: number) {
    this.warehouseService.getWarehouses(_page - 1, this.PageSize).subscribe({
      next: (data) => {
        this.Page = _page;
        this.Pages = Math.ceil(data.count / this.PageSize);
        this.warehouses = [...data.warehouses];
      },
      error: (err) => {},
    });
  }
  createRange(number: number) {
    return new Array(number).fill(0).map((n, index) => index + 1);
  }
}
