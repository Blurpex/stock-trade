import { Component, OnInit } from '@angular/core';
import { EChartsOption } from "echarts";
import { DataService } from "../../services/data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit{

  ticker: string = "";
  timeSeries: string = "";
  options!: EChartsOption;
  valueData: number[] = [];
  timeData: string[] = [];
  overview: any = [];

  constructor(private dataService: DataService, private route:ActivatedRoute) {
    this.ticker = this.route.snapshot.params['ticker'];
    this.timeSeries = this.route.snapshot.params['time'];
  }

  ngOnInit(): void {
    this.dataService
      .fetchData(this.ticker, this.timeSeries)
      .subscribe( result => {

        let data:Object = {};

        if(this.timeSeries =='INTRADAY') {
          console.log(result['Time Series (15min)']);
          data = result['Time Series (15min)'];
        }
        else if(this.timeSeries == 'WEEKLY') {
          console.log(result['Weekly Time Series']);
          data = result['Weekly Time Series'];
        }
        else if(this.timeSeries == 'MONTHLY') {
          console.log(result['Monthly Time Series']);
          data = result['Monthly Time Series'];
        }

        Object.entries(data).forEach(([date, value])=> {
          this.timeData.push(date);
          this.valueData.push(value['1. open']);
        });

        this.options = {
          backgroundColor: 'rgba(71,134,91,0.41)',
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            backgroundColor: '#171b26',
          },
          toolbox: {
            feature: { dataZoom: { yAxisIndex: false } }
          },
          xAxis: {
            data: this.timeData.reverse(),
            show: false,
            nameTextStyle: { fontWeight: 'bold' },
            axisLine: { lineStyle: { color: '#171b26' } },
            boundaryGap: false
          },
          yAxis: {
            scale: true,
            axisLine: { lineStyle: { color: '#171b26' } },
          },
          series: [
            {
              data: this.valueData.reverse(),
              type: 'line',
              stack: 'x',
              areaStyle: { color: '#e1ad01', opacity: 0.2 },
              lineStyle: { color: '#e1ad01', width: 5}
            },
          ],
        };
      });

    this.dataService
      .fetchInfo(this.ticker)
      .subscribe(result => {
        console.log(result)
        Object.entries(result).forEach(elem => {
          if(elem[0] != 'Description')
            this.overview.push(elem);
        });
      });
  }
}
