import { Injectable } from '@angular/core';
import { ExchangeFormModel } from '@fuse/models/exchange-form.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public notifyAmountChange: number | null = null;
  public symbols: any = null;
  public notifyExchangeFormValueChange: Subject<ExchangeFormModel> = new Subject();
  public notifyConversionRequestSent: Subject<ExchangeFormModel> = new Subject();
  constructor() { }

  getExchangeFormValueChange() {
    return this.notifyExchangeFormValueChange.asObservable();
  }

  sendExchangeFormValueChange(exchangeFormValue: ExchangeFormModel) {
    return this.notifyExchangeFormValueChange.next(exchangeFormValue);
  }

  sendConversionRequestSentNotification(exchangeFormValue: ExchangeFormModel) {
    return this.notifyConversionRequestSent.next(exchangeFormValue);
  }

  getConversionRequestSentNotification() {
    return this.notifyConversionRequestSent.asObservable();
  }
}
