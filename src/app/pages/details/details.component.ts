import { Component, OnInit } from '@angular/core';
import { ExchangeFormModel } from '@fuse/models/exchange-form.model';
import { DataSharingService } from '@fuse/services/data-sharing/data-sharing.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  exchangeFormValue: ExchangeFormModel | null = null;
  currencyFullName: string = '';

  constructor(private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    this.dataSharingService.getExchangeFormValueChange().subscribe(formValue => {
      this.exchangeFormValue = formValue;
      this.currencyFullName = this.dataSharingService.symbols[this.exchangeFormValue.from];
    })
  }


}
