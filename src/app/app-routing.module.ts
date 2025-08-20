import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockComponent } from './stock/stock.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { TitleComponent } from './title/title.component';
import { ProductsComponent } from './products/products.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CreateOrderComponent } from './create-order/create-order.component'
import { PurchaseEntryComponent } from './purchase-entry/purchase-entry.component';
import { TransactionPdfGeneratorComponent } from './transaction-pdf-generator/transaction-pdf-generator.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'stock', component: StockComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'stock', component: StockComponent },
      { path: 'tiles', component: TitleComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'vendors', component: VendorsComponent },
      { path: 'create-order', component: CreateOrderComponent },
      { path: 'purchase-entry', component: PurchaseEntryComponent },
      { path: 'transaction-pdf', component: TransactionPdfGeneratorComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
