import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverteredAmountCardComponent } from './convertered-amount-card.component';

describe('ConverteredAmountCardComponent', () => {
  let component: ConverteredAmountCardComponent;
  let fixture: ComponentFixture<ConverteredAmountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConverteredAmountCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConverteredAmountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
