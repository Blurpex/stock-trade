import { Injectable } from '@angular/core';
import { DataModel } from "../../models/DataModel";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=15min&apikey=R4L3WJVV5NRNNCEH"

  constructor(private http: HttpClient) {}

  fetchData():Observable<DataModel> {
    return this.http.get<DataModel>(this.url);
  }
}

// API key: R4L3WJVV5NRNNCEH
