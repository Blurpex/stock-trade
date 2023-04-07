import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  // finds the closest companies to the search
  fetchQuery(query:string):Observable<any> {
    const url:string = "https://www.alphavantage.co/" +
      "query?function=SYMBOL_SEARCH" +
      "&keywords=" + query +
      "&apikey=R4L3WJVV5NRNNCEH";
    console.log("query", url);
    return this.http.get(url);
  }

  // gets values such as open, close, high, and low
  fetchData(symbol: string, time: string):Observable<any> {
    const url:string = "https://www.alphavantage.co/" +
      "query?function=TIME_SERIES_" + time +
      "&symbol=" + symbol +
      "&interval=5min" +
      "&apikey=R4L3WJVV5NRNNCEH";
    console.log("info", url);
    return this.http.get<any>(url);
  }

  // gets information about the company
  fetchInfo(symbol: string):Observable<any>  {
    const url:string =  "https://www.alphavantage.co" +
      "/query?function=OVERVIEW" +
      "&symbol=" + symbol +
      "&apikey=R4L3WJVV5NRNNCEH";
    console.log("data", url);
    return this.http.get<any>(url);
  }
}

// API key: R4L3WJVV5NRNNCEH
