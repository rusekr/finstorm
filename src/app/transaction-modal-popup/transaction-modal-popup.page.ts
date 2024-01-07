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

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async closeModal() {
    const close: string = "Modal Removed";
    await this.modalController.dismiss(close);
  }

  cancel() {
    this.modalController.dismiss({}, 'cancel');
  }
  confirm() {
    this.modalController.dismiss({}, 'confirm');
  }

}
