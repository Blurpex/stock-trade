import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url: string = "";

  constructor(private http: HttpClient) {}

  fetchData(symbol: string, time: string):Observable<any> {
    this.url = "https://www.alphavantage.co/" +
      "query?function=TIME_SERIES_" + time +
      "&symbol=" + symbol +
      "&interval=15min" +
      "&apikey=R4L3WJVV5NRNNCEH";
    console.log(this.url)
    return this.http.get<any>(this.url);
  }
}

// API key: R4L3WJVV5NRNNCEH
