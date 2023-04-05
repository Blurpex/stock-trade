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

  // instance variables
  ticker: string = "";
  timeSeries: string = "";
  options!: EChartsOption;
  overview: Array<[string, unknown]> = [];

  // instantiate service and get params from router
  constructor(private dataService: DataService, private route:ActivatedRoute) {
    this.ticker = this.route.snapshot.params['ticker'];
    this.timeSeries = this.route.snapshot.params['time'];
  }

  // get values from API
  ngOnInit(): void {
    this.getValues();
  }

  // get values from API
  getValues(): void {
  this.dataService.fetchData(this.ticker, this.timeSeries)
    .subscribe( result => {

      let values: number[][] = [];
      let time: string[] = [];
      let volume: number[] = [];

      // @ts-ignore
      Object.entries(Object.entries(result).at(1)?.at(1))
        .forEach(([key, value])=> {
          time.push(key);
          // @ts-ignore
          let tempData: number[] = [];
          // @ts-ignore
          tempData.push(value['1. open']);
          // @ts-ignore
          tempData.push(value['4. close']);
          // @ts-ignore
          tempData.push(value['3. low']);
          // @ts-ignore
          tempData.push(value['2. high']);
          values.push(tempData);
          // @ts-ignore
          volume.push(value['5. volume']);
      });

      values = values.reverse();
      time = time.reverse();
      volume = volume.reverse();

      this.dataService.fetchInfo(this.ticker)
        .subscribe(result => {
          Object.entries(result).forEach(elem => {
            if(elem[0] != 'Description') this.overview.push(elem);
          });
        });

      // graph the chart
      this.graphChart(values, time, volume);
    });
  }

  // graph the chart with values from API
  graphChart(values: number[][], time: string[], volume: number[]): void {
    this.options = {
      title: { text: "Stock", left: 0 },
      legend: {
        bottom: 10,
        left: 'center',
        data: [this.ticker.toUpperCase(), 'Volume']
      },
      grid: { left: '5%', right: '3%', bottom: '15%' },
      dataZoom: [
        { type: 'inside' },
        { show: true, type: 'slider', top: '90%' }
      ],
      backgroundColor: '#171b26',
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: { type: 'cross' },
        backgroundColor: '#171b26'
      },
      toolbox: {
        feature: {
          dataZoom: { yAxisIndex: false },
          magicType: { type:['line', 'bar'] }
        },
        iconStyle: { borderColor: '#e1ad01' }
      },
      brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: { colorAlpha: 0.1 }
      },
      xAxis: [
        {
          data: time,
          boundaryGap: false,
          splitArea: { show: false },
          splitLine: { show: true, lineStyle: { color: 'rgba(119,119,119,0.14)'} },
        },
        {
          data: time,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: { show: false },
          splitLine: { show: true, lineStyle: { color: 'rgba(119,119,119,0.14)'} },
        },
        {
          scale: true,
          splitNumber: 1,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: this.ticker.toUpperCase(),
          type: 'candlestick',
          data: values,
          itemStyle: {
            color: '#00da3c',
            color0: '#ec0000',
            borderColor: '#008F28',
            borderColor0: '#8A0000'
          },
        },
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volume
        }
      ],
    };
  }
}
