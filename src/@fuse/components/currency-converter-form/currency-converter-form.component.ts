import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.scss']
})
export class CurrencyConverterFormComponent implements OnInit {

  @Input() context:string = 'home';
  constructor() {

  }

  ngOnInit(): void {
  }

}
