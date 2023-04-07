import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent {

  searchQuery: string = "";
  timeSeries: string = "INTRADAY";
  showSearch: boolean = false;
  queryResults: any = [];

  constructor(private dataService: DataService, private router:Router) {
  }

  goToStock(query: any) {
    this.router.navigate(['stocks', query["1. symbol"], this.timeSeries]);
  }

  showSuggestions() {
    this.dataService.fetchQuery(this.searchQuery)
      .subscribe(result => {
        this.queryResults = Object.entries(result).at(0)?.at(1);
        this.showSearch = true;
      });
  }

}

