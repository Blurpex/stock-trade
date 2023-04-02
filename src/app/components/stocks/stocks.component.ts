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
          data: this.time.reverse(),
          show: false,
          nameTextStyle: { fontWeight: 'bold' },
          axisLine: { lineStyle: { color: '#171b26' } },
          boundaryGap: false
        },
        yAxis: {
          scale: true,
          // show: false,
          axisLine: { lineStyle: { color: '#171b26' } },
        },
        series: [
          {
            data: this.data.reverse(),
            type: 'line',
            stack: 'x',
            areaStyle: { color: '#e1ad01', opacity: 0.2 },
            lineStyle: { color: '#e1ad01', width: 5}
          },
        ],
      };
    });
  }
}
