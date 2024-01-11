import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { addOutline, trendingDownOutline, trendingUpOutline } from 'ionicons/icons';
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

  // объект новой транзакции
  public newTransaction: Transaction = {
    id: 0,
    type: -1,
    date: new Date(),
    name: '',
    sum: 0,
    tags: [],
    // wallet: 0 
  };

  constructor(public databaseService: DatabaseService, private transactionModalCtrl: ModalController) {
    this.transactions = databaseService.transactions;
    this.databaseService = databaseService;
    
    addIcons({ addOutline, trendingDownOutline, trendingUpOutline });
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
        sum: transaction ? transaction.sum : 0
      }
    });
    modal.onDidDismiss().then(async (modelData) => {
      if (modelData !== null) {
        console.log('Modal Data : ' + modelData.data);
        let newTr = modelData.data;
        if (newTr !== undefined) {
          if (!transaction) {
            // добавляем транзакцию 
            this.databaseService.addTransaction(newTr);
            // после добавления транзакции сохраняем все транзакции в сторадже
            await this.databaseService.saveTransactions();
          } else {
            transaction.name = newTr.name;
            transaction.sum = newTr.sum;
            // после редактирования транзакции сохраняем все транзакции в сторадже
            await this.databaseService.saveTransactions();
          }
        }
      }
    });
    return await modal.present();
    // onWillDismiss(event: Event) {
    //   const ev = event as CustomEvent<OverlayEventDetail<Transaction>>;
    //   if (ev.detail.role === 'confirm') {
    //     let newTr = ev.detail.data;
    //     if (newTr !== undefined) {
    //       this.databaseService.addNewTransaction(newTr);
    //     }
    //   }
    // }
  }

  async deleteTransaction (index: number) {
    this.databaseService.deleteTransaction(index);
    await this.databaseService.saveTransactions();
  }



}
