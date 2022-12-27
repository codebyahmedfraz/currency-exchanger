import { Component, OnInit } from '@angular/core';
import { MostPopularCurrencies } from '@fuse/enum/most-popular-currencies.enum';
import { ExchangeFormModel } from '@fuse/models/exchange-form.model';
import { DataSharingService } from '@fuse/services/data-sharing/data-sharing.service';
import { HttpService } from '@fuse/services/http/http.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  exchangeFormValue: ExchangeFormModel | null = null;
  currencyFullName: string = '';
  mostPopularCurrencies = MostPopularCurrencies;
  popularCurrencies: string = '';
  rates: any = [];

  constructor(private dataSharingService: DataSharingService, private http: HttpService) { }

  ngOnInit(): void {
    let popularCurrencies = Object.keys(this.mostPopularCurrencies).filter((item) => {
      return isNaN(Number(item));
    });

    this.dataSharingService.getExchangeFormValueChange().subscribe(formValue => {
      if (formValue && formValue.amount && formValue.amount > 0) {
        const index = popularCurrencies.indexOf(formValue.from);
        if (index > -1) { // only splice array when item is found
          popularCurrencies.splice(index, 1); // 2nd parameter means remove one item only
        }
        if (popularCurrencies.length > 6) {
          popularCurrencies = popularCurrencies.slice(0, 6);
        }
        this.popularCurrencies = popularCurrencies.join(',');
  
        this.exchangeFormValue = formValue;
        this.currencyFullName = this.dataSharingService.symbols[formValue!.from];
        const getLatestUrl = `latest?base=${formValue.from}&symbols=${this.popularCurrencies}`;
        this.http.get<any>(getLatestUrl)
        .pipe(map((resp: any) => {
          resp.results = Object.entries(resp.rates).map(([symbol, rate]) => {
            return {symbol: symbol, rate: Number(rate) * formValue!.amount, amount: formValue!.amount, from: formValue!.from}
          });
          return resp;
        }))
        .subscribe((resp: any) => {
          if (resp && resp?.success) {
            this.rates = resp.results;
          }
        });
      }
    });
    
  }

}
