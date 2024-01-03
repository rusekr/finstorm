import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayEventDetail } from '@ionic/core/components';
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
  IonLabel,
  IonModal
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { DatabaseService, Transaction } from '../services/database.service';

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
    IonLabel,
    IonModal,
    FormsModule
  ]
})
export class Tab2Page {
  // работа с модалом добавления, редактирования транзакции
  @ViewChild(IonModal) modal: IonModal;
  public newTransaction: Transaction = {
    type: -1,
    date: new Date(),
    name: '',
    sum: 0,
    tags: [],
    // wallet: 0 
  };
  cancel() {
    this.modal.dismiss({}, 'cancel');
  }
  confirm() {
    this.modal.dismiss(this.newTransaction, 'confirm');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<Transaction>>;
    if (ev.detail.role === 'confirm') {
      let newTr = ev.detail.data;
      if (newTr !== undefined) {
        this.databaseService.addNewTransaction(newTr);
      }
    }
  }

  // работа с транзакциями
  public transactions;
  constructor(public databaseService: DatabaseService) {
    this.transactions = databaseService.transactions;
    this.databaseService = databaseService;
    //this.modal = 
  }
  // для оптимизации треканья транзакций т.к. их будут тонныы
  trackTransactions(index: number, transactionObject: any) {
    return index;// TODO: transactionObject.id;
  }
  showAddTransactionModal () {

  }



}
