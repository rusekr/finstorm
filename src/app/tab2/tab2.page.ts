import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  addOutline, 
  trendingDownOutline, 
  trendingUpOutline 
} from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
// import { ModalController } from '@ionic/angular';
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
import { DatabaseService, Transaction } from '../services/database.service';
import { TransactionModalPopupPage } from '../transaction-modal-popup/transaction-modal-popup.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
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
export class Tab2Page {

  // работа с транзакциями
  public transactions;

  constructor(public databaseService: DatabaseService, private transactionModalCtrl: ModalController) {
    this.transactions = databaseService.getTransactions();
    //this.databaseService = databaseService;
    
    addIcons({ 
      addOutline, 
      trendingDownOutline, 
      trendingUpOutline 
    });
  }

  // для оптимизации треканья транзакций т.к. их будут тонныы
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
        transactionType: (transaction && transaction.type === 1 ? 'in' : 'out') as string
      }
    });
    modal.onDidDismiss().then(async (modаlData) => {
      if (modаlData !== null) {
        let newTr = modаlData.data;
        if (newTr instanceof Object) {
          newTr.transactionType = newTr.transactionType === 'in' ? 1 : -1;
          if (!transaction) {
            // добавляем транзакцию 
            this.databaseService.addTransaction(newTr);
            // после добавления транзакции сохраняем все транзакции в сторадже
            await this.databaseService.saveTransactions();
          } else {
            transaction.name = newTr.name;
            transaction.sum = newTr.sum;
            transaction.date = newTr.date;
            transaction.type = newTr.transactionType;
            // после редактирования транзакции сохраняем все транзакции в сторадже
            await this.databaseService.saveTransactions();
          }
        }
      }
    });
    return await modal.present();
  }

  async deleteTransaction (index: number) {
    this.databaseService.deleteTransaction(index);
    await this.databaseService.saveTransactions();
  }



}
