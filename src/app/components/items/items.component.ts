import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../_services/warehouse.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  PageSize: number = 10;
  Pages: number = 1;
  Page: number = 1;
  items: any[] = [];
  itemDeleted: any = null;
  name: string | null = null;
  id: string | null = null;

  constructor(
    private modalService: NgbModal,
    private warehouseService: WarehouseService,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = this._Activatedroute.snapshot.paramMap.get('name');
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    if (!this.name || !this.id) {
      this.router.navigate(['Warehouse']);
    } else {
      this.getItems(this.Page);
    }
  }

  openDeleteModal(content: any, item: any) {
    this.modalService.open(content);
    this.itemDeleted = item;
  }

  deleteItem(id: string) {
    this.warehouseService.deleteItem(id).subscribe({
      next: (data) => {
        this.getItems(this.Page);
      },
      error: (err) => {},
    });
  }

  getItems(_page: number) {
    this.warehouseService
      .getItems(_page - 1, this.PageSize, this.id)
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
}
