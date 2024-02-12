import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { DatabaseService } from '../services/database.service';
import { Transaction, TransactionType } from '../models/database.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {

  public transactions: Transaction[];
  public transactionTypes = TransactionType;

  constructor(public databaseService: DatabaseService) {
    this.transactions = databaseService.getTransactions();
  }
}
