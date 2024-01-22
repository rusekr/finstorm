import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  addOutline,
  trendingDownOutline,
  trendingUpOutline
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonFab,
  IonFabButton,
  IonHeader,
  IonInput,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonIcon,
  IonItem,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonLabel,
  IonModal,
  ModalController
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { DatabaseService } from '../services/database.service';
import { TransactionModalPopupPage } from '../transaction-modal-popup/transaction-modal-popup.page';
import { Transaction, TransactionType } from '../models/database.interface';

@Component({
  selector: 'app-journal',
  templateUrl: 'journal.page.html',
  styleUrls: ['journal.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ExploreContainerComponent,
    IonButton,
    IonButtons,
    IonFab,
    IonFabButton,
    IonHeader,
    IonInput,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonInput,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonLabel,
    IonModal,
    FormsModule
  ]
})
export class JournalPage {

  // работа с транзакциями
  public transactions: Transaction[];
  public transactionTypes = TransactionType;

  constructor(public databaseService: DatabaseService, private transactionModalCtrl: ModalController) {
    this.transactions = databaseService.getTransactions();

    addIcons({
      addOutline,
      trendingDownOutline,
      trendingUpOutline
    });
  }

  // для оптимизации треканья транзакций т.к. их будут тонны
  trackTransactions(index: number, transactionObject: any) {
    return transactionObject.id;
  }


  async openTransactionModal (transaction: any) {
    const modal = await this.transactionModalCtrl.create({
      component: TransactionModalPopupPage,
      componentProps: {
        name: transaction ? transaction.name : '',
        sum: transaction ? transaction.sum : 0,
        date: transaction ? transaction.date : new Date().toISOString(),
        transactionType: transaction ? transaction.type : TransactionType.EXPENSE,
      }
    });

    modal.onDidDismiss().then(async (modalEvent) => {
      if (modalEvent === null || !modalEvent.data) return;

      const newTransaction: Transaction = modalEvent.data;
      if (!transaction) {
        // добавляем транзакцию
        this.databaseService.addTransaction(newTransaction);
        // после добавления транзакции сохраняем все транзакции в сторадже
        await this.databaseService.saveTransactions();
      } else {
        transaction.name = newTransaction.name;
        transaction.sum = newTransaction.sum;
        transaction.date = newTransaction.date;
        transaction.type = newTransaction.type;
        // после редактирования транзакции сохраняем все транзакции в сторадже
        await this.databaseService.saveTransactions();
      }
    });
    return await modal.present();
  }

  async deleteTransaction (index: number) {
    this.databaseService.deleteTransaction(index);
    await this.databaseService.saveTransactions();
  }



}
