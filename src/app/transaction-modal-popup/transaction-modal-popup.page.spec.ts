import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TransactionModalPopupPage } from './transaction-modal-popup.page';

describe('TransactionModalPopupPage', () => {
  let component: TransactionModalPopupPage;
  let fixture: ComponentFixture<TransactionModalPopupPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(TransactionModalPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
