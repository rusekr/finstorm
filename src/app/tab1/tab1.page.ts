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

  public incomeSum: number = 0; // доход (общий или за отрезок времени)
  public outcomeSum: number = 0; // расход (общий или за отрезок времени)
  public budgetSum: number = 0; // бюджет (доход минус расход)

  // TODO: добавить мультиселект категорий, дату от, дату до

  public transactions: Transaction[] = [];
  public transactionTypes = TransactionType;

  constructor(private databaseService: DatabaseService) {


  }

  ionViewDidEnter() {
    this.transactions = this.databaseService.getTransactions();

    let sums = this.transactions.reduce((acc, cur) => {
      if (cur.type === -1) {
        acc.outcome += cur.sum;
      } else {
        acc.income += cur.sum;
      }
      return acc;
    }, { income: 0, outcome: 0 });

    this.incomeSum = sums.income;
    this.outcomeSum = sums.outcome;

    this.budgetSum = this.incomeSum - this.outcomeSum;
  }

}
