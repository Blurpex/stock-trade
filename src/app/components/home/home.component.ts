import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newsService:Observable<any>;
  newsList:any;

  constructor(private dataService:DataService) {
    this.newsService = this.dataService.fetchNews();
  }

  ngOnInit(): void {
    this.newsService.subscribe(result => {
      this.newsList = result.feed;
      console.log(this.newsList);
    })
  }

}
