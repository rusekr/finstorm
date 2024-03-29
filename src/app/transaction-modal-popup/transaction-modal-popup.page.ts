import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { TransactionType, Category } from '../models/database.interface';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-transaction-modal-popup',
  templateUrl: './transaction-modal-popup.page.html',
  styleUrls: ['./transaction-modal-popup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TransactionModalPopupPage {

  public date: string = (new Date()).toISOString();
  public name: string = '';
  public sum: number = 0;
  public type: TransactionType = TransactionType.EXPENSE;
  public transactionTypes = TransactionType;
  public categories: Category[] = [];
  public allCategories: Category[];

  constructor(private modalController: ModalController, public databaseService: DatabaseService) {
    this.allCategories = databaseService.getCategories();
  }

  public cancel(): void {
    this.modalController.dismiss(null, 'cancel');
  }
  public confirm(): void {
    this.modalController.dismiss({
      name: this.name,
      sum: this.sum,
      date: this.date,
      type: this.type,
      categories: this.categories,
    }, 'confirm');
  }

}
