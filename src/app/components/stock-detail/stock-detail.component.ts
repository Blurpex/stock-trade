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
  valueData:any = [];
  openData: any = [];
  closeData: any = [];
  highData: any = [];
  lowData: any = [];
  volumeData: any = [];
  candlestickData: any = [];
  timeData: string[] = [];
  overview: Array<[string, unknown]> = [];

  constructor(private dataService: DataService, private route:ActivatedRoute) {
    this.ticker = this.route.snapshot.params['ticker'];
    this.timeSeries = this.route.snapshot.params['time'];
  }

  ngOnInit(): void {
    this.dataService
      .fetchData(this.ticker, this.timeSeries)
      .subscribe( result => {

        let data = Object.entries(result).at(1)?.at(1);
        // @ts-ignore
        Object.entries(data)
          .forEach(([key, value])=> {
            this.timeData.push(key);
            // @ts-ignore
            this.valueData.push(value);
          });

        this.valueData.forEach((elem: any) => {
          // this.openData.push(elem['1. open']);
          // this.lowData.push(elem['2. high']);
          // this.highData.push(elem['3. low']);
          // this.closeData.push(elem['4. close']);
          this.volumeData.push(elem['5. volume']);
        });

        this.valueData.forEach((elem:any) => {
          let data: any = [];
          data.push(elem['1. open']);
          data.push(elem['4. close']);
          data.push(elem['3. low']);
          data.push(elem['2. high']);
          this.candlestickData.push(data);
        });








        this.options = {
          title: { text: "Stock", left: 0 },
          legend: {
            bottom: 10,
            left: 'center',
            data: ['Open', 'Low', 'High', 'Close']
          },

          grid: { bottom: '15%' },

          dataZoom: [
            { type: 'inside' },
            { show: true, type: 'slider', top: '90%' }
          ],

          backgroundColor: '#171b26',

          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { type: 'cross' },
            backgroundColor: '#171b26',
          },

          toolbox: {
            feature: {
              dataZoom: { yAxisIndex: false },
              magicType: { type:['line', 'bar'] }
            },
            iconStyle: { borderColor: '#e1ad01' }
          },

          xAxis: [
            {
              scale: true,
              data: this.timeData,
              splitArea: { show: false },
              splitLine: { show: true, lineStyle: { color: 'rgba(119,119,119,0.14)'} }
            },
            {
              data: this.timeData,
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
              splitLine: { show: true, lineStyle: { color: 'rgba(119,119,119,0.14)'} }
            },
            {
              scale: true,
              splitNumber: 2,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false }
            }
          ],

          series: [
            {
              // name: '',
              type: 'candlestick',
              data: this.candlestickData.reverse(),
              itemStyle: {
                color: '#ec0000',
                color0: '#00da3c',
                borderColor: '#8A0000',
                borderColor0: '#008F28'
              },
            },
            {
              name: 'Volume',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: this.volumeData.reverse()
            }
            // { name: 'Open', data: this.openData.reverse(), type: 'line' },
            // { name: 'Low', data: this.lowData.reverse(), type: 'line' },
            // { name: 'High', data: this.highData.reverse(), type: 'line' },
            // { name: 'Close', data: this.closeData.reverse(), type: 'line' },
          ],
        };
      });

    this.dataService
      .fetchInfo(this.ticker)
      .subscribe(result => {
        Object.entries(result).forEach(elem => {
          if(elem[0] != 'Description')
            this.overview.push(elem);
        });
      });
  }
}
