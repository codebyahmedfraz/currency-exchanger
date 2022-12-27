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
      // this.http.get<any>('symbols').subscribe((resp: any) => {
      //   if (resp && resp?.success) {
      //     this.symbolsList = resp.symbols;
      //     this.dataSharingService.symbols = this.symbolsList;
      // this.dataSharingService.sendExchangeFormValueChange(this.exchangeForm.value);
      //   }
      // });

      this.symbolsList = {
            "AED": "United Arab Emirates Dirham",
            "AFN": "Afghan Afghani",
            "ALL": "Albanian Lek",
            "AMD": "Armenian Dram",
            "ANG": "Netherlands Antillean Guilder",
            "AOA": "Angolan Kwanza",
            "ARS": "Argentine Peso",
            "AUD": "Australian Dollar",
            "AWG": "Aruban Florin",
            "AZN": "Azerbaijani Manat",
            "BAM": "Bosnia-Herzegovina Convertible Mark",
            "BBD": "Barbadian Dollar",
            "BDT": "Bangladeshi Taka",
            "BGN": "Bulgarian Lev",
            "BHD": "Bahraini Dinar",
            "BIF": "Burundian Franc",
            "BMD": "Bermudan Dollar",
            "BND": "Brunei Dollar",
            "BOB": "Bolivian Boliviano",
            "BRL": "Brazilian Real",
            "BSD": "Bahamian Dollar",
            "BTC": "Bitcoin",
            "BTN": "Bhutanese Ngultrum",
            "BWP": "Botswanan Pula",
            "BYN": "New Belarusian Ruble",
            "BYR": "Belarusian Ruble",
            "BZD": "Belize Dollar",
            "CAD": "Canadian Dollar",
            "CDF": "Congolese Franc",
            "CHF": "Swiss Franc",
            "CLF": "Chilean Unit of Account (UF)",
            "CLP": "Chilean Peso",
            "CNY": "Chinese Yuan",
            "COP": "Colombian Peso",
            "CRC": "Costa Rican Col\u00f3n",
            "CUC": "Cuban Convertible Peso",
            "CUP": "Cuban Peso",
            "CVE": "Cape Verdean Escudo",
            "CZK": "Czech Republic Koruna",
            "DJF": "Djiboutian Franc",
            "DKK": "Danish Krone",
            "DOP": "Dominican Peso",
            "DZD": "Algerian Dinar",
            "EGP": "Egyptian Pound",
            "ERN": "Eritrean Nakfa",
            "ETB": "Ethiopian Birr",
            "EUR": "Euro",
            "FJD": "Fijian Dollar",
            "FKP": "Falkland Islands Pound",
            "GBP": "British Pound Sterling",
            "GEL": "Georgian Lari",
            "GGP": "Guernsey Pound",
            "GHS": "Ghanaian Cedi",
            "GIP": "Gibraltar Pound",
            "GMD": "Gambian Dalasi",
            "GNF": "Guinean Franc",
            "GTQ": "Guatemalan Quetzal",
            "GYD": "Guyanaese Dollar",
            "HKD": "Hong Kong Dollar",
            "HNL": "Honduran Lempira",
            "HRK": "Croatian Kuna",
            "HTG": "Haitian Gourde",
            "HUF": "Hungarian Forint",
            "IDR": "Indonesian Rupiah",
            "ILS": "Israeli New Sheqel",
            "IMP": "Manx pound",
            "INR": "Indian Rupee",
            "IQD": "Iraqi Dinar",
            "IRR": "Iranian Rial",
            "ISK": "Icelandic Kr\u00f3na",
            "JEP": "Jersey Pound",
            "JMD": "Jamaican Dollar",
            "JOD": "Jordanian Dinar",
            "JPY": "Japanese Yen",
            "KES": "Kenyan Shilling",
            "KGS": "Kyrgystani Som",
            "KHR": "Cambodian Riel",
            "KMF": "Comorian Franc",
            "KPW": "North Korean Won",
            "KRW": "South Korean Won",
            "KWD": "Kuwaiti Dinar",
            "KYD": "Cayman Islands Dollar",
            "KZT": "Kazakhstani Tenge",
            "LAK": "Laotian Kip",
            "LBP": "Lebanese Pound",
            "LKR": "Sri Lankan Rupee",
            "LRD": "Liberian Dollar",
            "LSL": "Lesotho Loti",
            "LTL": "Lithuanian Litas",
            "LVL": "Latvian Lats",
            "LYD": "Libyan Dinar",
            "MAD": "Moroccan Dirham",
            "MDL": "Moldovan Leu",
            "MGA": "Malagasy Ariary",
            "MKD": "Macedonian Denar",
            "MMK": "Myanma Kyat",
            "MNT": "Mongolian Tugrik",
            "MOP": "Macanese Pataca",
            "MRO": "Mauritanian Ouguiya",
            "MUR": "Mauritian Rupee",
            "MVR": "Maldivian Rufiyaa",
            "MWK": "Malawian Kwacha",
            "MXN": "Mexican Peso",
            "MYR": "Malaysian Ringgit",
            "MZN": "Mozambican Metical",
            "NAD": "Namibian Dollar",
            "NGN": "Nigerian Naira",
            "NIO": "Nicaraguan C\u00f3rdoba",
            "NOK": "Norwegian Krone",
            "NPR": "Nepalese Rupee",
            "NZD": "New Zealand Dollar",
            "OMR": "Omani Rial",
            "PAB": "Panamanian Balboa",
            "PEN": "Peruvian Nuevo Sol",
            "PGK": "Papua New Guinean Kina",
            "PHP": "Philippine Peso",
            "PKR": "Pakistani Rupee",
            "PLN": "Polish Zloty",
            "PYG": "Paraguayan Guarani",
            "QAR": "Qatari Rial",
            "RON": "Romanian Leu",
            "RSD": "Serbian Dinar",
            "RUB": "Russian Ruble",
            "RWF": "Rwandan Franc",
            "SAR": "Saudi Riyal",
            "SBD": "Solomon Islands Dollar",
            "SCR": "Seychellois Rupee",
            "SDG": "Sudanese Pound",
            "SEK": "Swedish Krona",
            "SGD": "Singapore Dollar",
            "SHP": "Saint Helena Pound",
            "SLE": "Sierra Leonean Leone",
            "SLL": "Sierra Leonean Leone",
            "SOS": "Somali Shilling",
            "SRD": "Surinamese Dollar",
            "STD": "S\u00e3o Tom\u00e9 and Pr\u00edncipe Dobra",
            "SVC": "Salvadoran Col\u00f3n",
            "SYP": "Syrian Pound",
            "SZL": "Swazi Lilangeni",
            "THB": "Thai Baht",
            "TJS": "Tajikistani Somoni",
            "TMT": "Turkmenistani Manat",
            "TND": "Tunisian Dinar",
            "TOP": "Tongan Pa\u02bbanga",
            "TRY": "Turkish Lira",
            "TTD": "Trinidad and Tobago Dollar",
            "TWD": "New Taiwan Dollar",
            "TZS": "Tanzanian Shilling",
            "UAH": "Ukrainian Hryvnia",
            "UGX": "Ugandan Shilling",
            "USD": "United States Dollar",
            "UYU": "Uruguayan Peso",
            "UZS": "Uzbekistan Som",
            "VEF": "Venezuelan Bol\u00edvar Fuerte",
            "VES": "Sovereign Bolivar",
            "VND": "Vietnamese Dong",
            "VUV": "Vanuatu Vatu",
            "WST": "Samoan Tala",
            "XAF": "CFA Franc BEAC",
            "XAG": "Silver (troy ounce)",
            "XAU": "Gold (troy ounce)",
            "XCD": "East Caribbean Dollar",
            "XDR": "Special Drawing Rights",
            "XOF": "CFA Franc BCEAO",
            "XPF": "CFP Franc",
            "YER": "Yemeni Rial",
            "ZAR": "South African Rand",
            "ZMK": "Zambian Kwacha (pre-2013)",
            "ZMW": "Zambian Kwacha",
            "ZWL": "Zimbabwean Dollar"
        }
        this.dataSharingService.symbols = this.symbolsList;
        this.dataSharingService.sendExchangeFormValueChange(this.exchangeForm.getRawValue());
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
