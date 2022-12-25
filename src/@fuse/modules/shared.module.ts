import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { ConverteredAmountCardComponent } from '@fuse/components/convertered-amount-card/convertered-amount-card.component';
import { CurrencyConverterFormComponent } from '@fuse/components/currency-converter-form/currency-converter-form.component';
import { HistoricalDataChartComponent } from '@fuse/components/historical-data-chart/historical-data-chart.component';
import { LayoutComponent } from '@fuse/components/layout/layout.component';
import { HeaderComponent } from '@fuse/components/layout/header/header.component';
import { ErrorComponent } from '@fuse/components/error/error.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConverteredAmountCardComponent,
    CurrencyConverterFormComponent,
    HistoricalDataChartComponent,
    LayoutComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ConverteredAmountCardComponent,
    CurrencyConverterFormComponent,
    HistoricalDataChartComponent,
    LayoutComponent,
    HeaderComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
