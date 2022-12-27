import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  public notifyAmountChange: number | null = null;
  constructor() { }
}
