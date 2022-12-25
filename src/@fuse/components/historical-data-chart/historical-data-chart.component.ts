import { Component, OnInit } from '@angular/core';
import {Chart, ChartConfiguration, ChartItem, registerables} from 'chart.js'

@Component({
  selector: 'app-historical-data-chart',
  templateUrl: './historical-data-chart.component.html',
  styleUrls: ['./historical-data-chart.component.scss']
})
export class HistoricalDataChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createChart();

    const data = {
      labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      datasets: [{
        label: 'EUR - USD',
        backgroundColor: '#3f51b5',
        borderColor: '#3f51b5',
        data: [10, 5, 2, 20, 30, 45, 10, 5, 2, 20, 30, 45],
      }]
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          display: false
        }
      }
    }

    const config: ChartConfiguration = {
      type: 'line',
      data: data,
      options: options
    }

    const chartItem: ChartItem | any = document.getElementById('chart-canvas') as ChartItem | any;

    chartItem['width']  = '100vw';

    new Chart(chartItem, config)
  }

  createChart(): void {
    Chart.register(...registerables);
  }

}
