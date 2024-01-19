import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-transaction-modal-popup',
  templateUrl: './transaction-modal-popup.page.html',
  styleUrls: ['./transaction-modal-popup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TransactionModalPopupPage implements OnInit {

  @Input() name: string = '';
  @Input() sum: number = 0;
  transactionType: string = 'out';

  constructor(private modalController: ModalController) {
    console.log(`constructor ${this.transactionType} transactionType`);
  }

  ngOnInit() {
    console.log(`ngOnInit ${this.transactionType} transactionType`);
    //this.transactionType = 'in';
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }
  confirm() {
    this.modalController.dismiss({
      name: this.name,
      sum: this.sum,
      transactionType: this.transactionType
    }, 'confirm');
  }

}
