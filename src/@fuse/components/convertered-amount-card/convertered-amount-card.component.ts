import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-convertered-amount-card',
  templateUrl: './convertered-amount-card.component.html',
  styleUrls: ['./convertered-amount-card.component.scss']
})
export class ConverteredAmountCardComponent {
  @Input() rate: any = null;
  constructor() { }

}
