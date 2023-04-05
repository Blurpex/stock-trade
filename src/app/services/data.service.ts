import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  fetchData(symbol: string, time: string):Observable<any> {
    const url :string = "https://www.alphavantage.co/" +
      "query?function=TIME_SERIES_" + time +
      "&symbol=" + symbol +
      "&interval=15min" +
      "&apikey=R4L3WJVV5NRNNCEH";
    console.log("info", url);
    return this.http.get<any>(url);
  }

  fetchInfo(symbol: string) {
    const url :string =  "https://www.alphavantage.co" +
      "/query?function=OVERVIEW" +
      "&symbol=" + symbol +
      "&apikey=R4L3WJVV5NRNNCEH";
    console.log("data", url);
    return this.http.get<any>(url);
  }
}

// API key: R4L3WJVV5NRNNCEH
