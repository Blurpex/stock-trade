import { Component, OnInit } from '@angular/core';
import { EChartsOption } from "echarts";
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  options!: EChartsOption;
  data: number[] = [];
  time: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService
      .fetchData()
      .subscribe( result => {
        console.log(result["Time Series (15min)"]);
        let data = result["Time Series (15min)"];

        Object.entries(data).forEach(([date, value], index)=> {
          this.time.push(date.substring(11));
          this.data.push(value['1. open']);
        });

        this.options = {
          grid: {
          },
          xAxis: {
            data: this.time.reverse(),
          },
          yAxis: {
            min: Math.min(...this.data),
          },
          series: [
            {
              data: this.data.reverse(),
              type: 'line',
              emphasis: { focus: 'series' }
            },
          ],
        };

      });
  }
}
