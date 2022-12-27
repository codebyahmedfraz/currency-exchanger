import { Component, OnInit } from '@angular/core';
import { ExchangeFormModel } from '@fuse/models/exchange-form.model';
import { DataSharingService } from '@fuse/services/data-sharing/data-sharing.service';
import { HttpService } from '@fuse/services/http/http.service';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import * as moment from 'moment';
import { map } from 'rxjs';

@Component({
  selector: 'app-historical-data-chart',
  templateUrl: './historical-data-chart.component.html',
  styleUrls: ['./historical-data-chart.component.scss']
})
export class HistoricalDataChartComponent implements OnInit {
  exchangeFormValue: ExchangeFormModel | null = null;
  chartRef: any;

  constructor(
    private dataSharingService: DataSharingService,
    private http: HttpService
    ) { }

  ngOnInit(): void {
    this.dataSharingService.getConversionRequestSentNotification().subscribe(formValue => {
      this.exchangeFormValue = formValue;
      this.fetchGraphData();
    })

    this.createChart();

  }

  fetchGraphData() {
    const [fromDate, toDate] = [this.listOfLastDatesOfPrev12Months[0], this.listOfLastDatesOfPrev12Months[this.listOfLastDatesOfPrev12Months.length - 1]];
    const from = this.exchangeFormValue?.from;
    const to = this.exchangeFormValue?.to;
    const timeSeriesAPI = `timeseries?start_date=${fromDate}&end_date=${toDate}&base=${from}&symbols=${to}`;

    this.http.get<any>(timeSeriesAPI)
        .pipe(map((resp: any) => {
          resp.result = {labels: [], data: []}
          this.listOfLastDatesOfPrev12Months.forEach(date => {
            resp.result.labels.push(date);
            resp.result.data.push(Object.values(resp.rates[date])[0]);
          })
          return resp;
        }))
        .subscribe((resp: any) => {
          if (resp && resp?.success) {
            this.createGraph(resp?.result, `${from} - ${to}`);
          }
        });
  }

  createChart(): void {
    Chart.register(...registerables);
  }

  createGraph(gData: any, label: string) {
    const data = {
      labels: gData.labels,
      datasets: [{
        label: label,
        backgroundColor: '#3f51b5',
        borderColor: '#3f51b5',
        data: gData.data,
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

    chartItem['width'] = '100vw';

    if (this.chartRef) {
      this.chartRef.destroy();
    }

    this.chartRef = new Chart(chartItem, config)
  }

  get listOfLastDatesOfPrev12Months() {
    let check = moment();

    let month = Number(check.format('M'));
    let year = Number(check.format('YYYY'));
    let lastDateOfPrev12Months = [];

    for (let i = 11; i >= 0; i--) {
      const m = ((month + i - 1) % 12);
      lastDateOfPrev12Months.push(moment(new Date(year, m, 1)).endOf("month").format('YYYY-MM-DD'));
      if (m === 0) {
        year--;
      }
    }

    return lastDateOfPrev12Months.reverse();
  }

}
