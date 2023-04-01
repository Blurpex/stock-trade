import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { StocksComponent } from "./components/stocks/stocks.component";
import { AboutComponent } from "./components/about/about.component";

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
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
