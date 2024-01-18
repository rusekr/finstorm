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
  @Input() type: string = 'out';

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    this.type = event.detail.value;
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }
  confirm() {
    this.modalController.dismiss({
      name: this.name,
      sum: this.sum,
      type: this.type
    }, 'confirm');
  }

}
