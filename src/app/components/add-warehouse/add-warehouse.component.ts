import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../_services/warehouse.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css'],
})
export class AddWarehouseComponent implements OnInit {
  warehouse: any = {
    name: null,
    address: null,
    country: null,
    city: null,
  };
  Countries: any[] = [{ name: 'jordan' }, { name: 'UAE' }, { name: 'USA' }];
  id: string | null = '';

  constructor(
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private warehouseService: WarehouseService
  ) {}

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.paramMap.get('id');
    if (!!this.id) {
      this.warehouseService.getWarehouse(this.id).subscribe({
        next: (data) => {
          this.warehouse = data.warehouse;
        },
        error: (err) => {},
      });
    }
  }

  onSubmit(): void {
    this.warehouseService.addWarehouse(this.warehouse).subscribe({
      next: (data) => {
        this.router.navigate(['Warehouse']);
      },
      error: (err) => {},
    });
  }
}
