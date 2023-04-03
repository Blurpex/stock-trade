import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {

  searchInput: string = "";
  timeSeries: string = "INTRADAY";

  constructor(private router:Router) {}

  goToStock() {
    this.router.navigate(['stocks', this.searchInput, this.timeSeries]);
  }
}

