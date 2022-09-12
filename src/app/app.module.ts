import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogsViewComponent } from './components/logs-view/logs-view.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddWarehouseComponent } from './components/add-warehouse/add-warehouse.component';
import { ItemsComponent } from './components/items/items.component';
import { AddItemComponent } from './components/add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    WarehouseComponent,
    DashboardComponent,
    LogsViewComponent,
    AddUserComponent,
    AddWarehouseComponent,
    ItemsComponent,
    AddItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
