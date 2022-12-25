import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.scss']
})
export class CurrencyConverterFormComponent implements OnInit {

  @Input() context:string = 'home';
  exchangeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.exchangeForm = this.formBuilder.group({
      amount: new FormControl(),
      from: new FormControl(),
      to: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  convert() {
    console.log(this.exchangeForm.value);
  }

  get isValidAmount() {
    const amount = this.exchangeForm.get('amount');
    return amount && amount.value && Number(amount.value) > 0 ? true : false;
  }

}
