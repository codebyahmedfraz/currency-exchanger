import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExchangeFormModel } from '@fuse/models/exchange-form.model';
import { DataSharingService } from '@fuse/services/data-sharing/data-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  exchangeFormValue: ExchangeFormModel | null = null;
  currencyFullName: string = '';
  subscriptions: Subscription[] = [];

  constructor(private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    const sub = this.dataSharingService.getExchangeFormValueChange().subscribe(formValue => {
      this.exchangeFormValue = formValue;
      this.currencyFullName = this.dataSharingService.symbols[this.exchangeFormValue.from];
    })
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }


}
