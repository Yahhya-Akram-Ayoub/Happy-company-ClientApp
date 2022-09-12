import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../_services/warehouse.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  itemId: string | null = '';
  warehouseId: string | null = '';
  warehouseName: string | null = '';
  item: any = {
    name: null,
    skU_Code: null,
    qty: null,
    cost_Price: null,
    msrP_Price: null,
    warehouseId: null,
  };

  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private warehouseService: WarehouseService
  ) {}

  ngOnInit(): void {
    this.itemId = this._Activatedroute.snapshot.paramMap.get('id');
    this.warehouseName = this._Activatedroute.snapshot.paramMap.get('name');
    this.warehouseId =
      this._Activatedroute.snapshot.paramMap.get('warehouseId');

    if (!!this.itemId) {
      this.warehouseService.getItem(this.itemId).subscribe({
        next: (data) => {
          this.item = data.item;
        },
        error: (err) => {},
      });
    }
  }

  onSubmit(): void {
    this.item.warehouseId = parseInt(this.warehouseId || '0');
    this.item.msrP_Price =
      this.item.msrP_Price == null ? 0 : this.item.msrP_Price;
    this.warehouseService.addItem(this.item).subscribe({
      next: (data) => {
        this.router.navigate([
          `/warehouse/items/${this.warehouseId}/${this.warehouseName}`,
        ]);
      },
      error: (err) => {},
    });
  }
}
