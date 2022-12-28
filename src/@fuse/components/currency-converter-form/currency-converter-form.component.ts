import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConversionQueryModel, ConversionRateInfoModel, ConversionResponseModel } from '@fuse/models/conversion-response.model';
import { DataSharingService } from '@fuse/services/data-sharing/data-sharing.service';
import { HttpService } from '@fuse/services/http/http.service';

@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.scss']
})
export class CurrencyConverterFormComponent implements OnInit {

  @Input() context:string = 'home';
  exchangeForm: FormGroup;
  symbolsList : any = {};
  
  conversionQuery: ConversionQueryModel | null = null;
  conversionInfo: ConversionRateInfoModel | null = null;
  conversion: ConversionResponseModel | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dataSharingService: DataSharingService) {
    this.exchangeForm = this.formBuilder.group({
      amount: [1, [Validators.required, Validators.min(0.01)]],
      from: ['EUR', Validators.required],
      to: ['USD', Validators.required]
    });
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      if (routeParams.hasOwnProperty('from') && routeParams.hasOwnProperty('to')) {
        this.exchangeForm.patchValue( {
          from: routeParams['from'],
          to: routeParams['to'],
        } );
        this.dataSharingService.sendExchangeFormValueChange(this.exchangeForm.getRawValue());
        this.from.disable();
      } else {
        this.from.enable();
      }
    });
    if (this.dataSharingService.notifyAmountChange) {
      this.exchangeForm.patchValue( {
        amount: this.dataSharingService.notifyAmountChange
      } );
    }
    
    this.exchangeForm.valueChanges.subscribe((value) => {
      this.conversion = null;
      this.conversionInfo = null;
      this.conversionQuery = null;
      this.dataSharingService.sendExchangeFormValueChange(this.exchangeForm.getRawValue());
    })
    this.symbolsList = this.dataSharingService.symbols;
    if (!this.dataSharingService.symbols) {
      this.http.get<any>('symbols').subscribe((resp: any) => {
        if (resp && resp?.success) {
          this.symbolsList = resp.symbols;
          this.dataSharingService.symbols = this.symbolsList;
          this.dataSharingService.sendExchangeFormValueChange(this.exchangeForm.value);
        }
      });
    }
  }

  convert() {
    const exchangeFormValue = this.exchangeForm.getRawValue();
    const convertUrl = `convert?to=${exchangeFormValue.to}&from=${exchangeFormValue.from}&amount=${exchangeFormValue.amount}`;
    this.dataSharingService.sendConversionRequestSentNotification(exchangeFormValue);
    this.http.get<ConversionResponseModel>(convertUrl)
    .subscribe((resp: ConversionResponseModel) => {
      if (resp && resp?.success) {
        this.conversionInfo = resp.info;
        this.conversion = resp;
        this.conversionQuery = resp.query;
      }
    });
  }

  swapCurrencies() {
    if (this.exchangeForm.valid) {
      const exchangeFormValue = this.exchangeForm.getRawValue();
      this.exchangeForm.patchValue( {
        from: exchangeFormValue.to,
        to: exchangeFormValue.from,
      } );
    }
  }

  get amount() {
    return this.exchangeForm.controls['amount'];
  }
  get from() {
    return this.exchangeForm.controls['from'];
  }
  get to() {
    return this.exchangeForm.controls['to'];
  }

  get detailsUrl() {
    return `/details/${this.from.value}/${this.to.value}`;
  }

  navidateToDetails() {
    if (this.exchangeForm.controls['amount'].valid) {
      this.dataSharingService.notifyAmountChange = this.exchangeForm.controls['amount'].value;
    }
    this.router.navigate([this.detailsUrl]);
  }

}
