import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogsViewComponent } from './components/logs-view/logs-view.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ItemsComponent } from './components/items/items.component';
import { AddWarehouseComponent } from './components/add-warehouse/add-warehouse.component';
import {
  AuthGuard,
  NotAuthGuard,
  AdminGuard,
} from './components/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  {
    path: 'Users',
    component: UsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Warehouse',
    component: WarehouseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'logs', component: LogsViewComponent, canActivate: [AdminGuard] },
  { path: 'user/add', component: AddUserComponent, canActivate: [AuthGuard] },
  {
    path: 'user/edit/:id',
    component: AddUserComponent,
    canActivate: [AuthGuard],
  }, // AdminGuard
  {
    path: 'warehouse/add',
    component: AddWarehouseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'warehouse/items/:id/:name',
    component: ItemsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'warehouse/edit/:id',
    component: AddWarehouseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':name/item/edit/:warehouseId/:id',
    component: AddItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':name/item/add/:warehouseId',
    component: AddItemComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: LoginComponent,
    canActivate: [NotAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
