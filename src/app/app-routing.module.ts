import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { StocksComponent } from "./components/stocks/stocks.component";
import { AboutComponent } from "./components/about/about.component";
import { StockDetailComponent } from "./components/stock-detail/stock-detail.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'stocks',
    component: StocksComponent
  },
  {
    path: 'stocks/:ticker/:time',
    component: StockDetailComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
