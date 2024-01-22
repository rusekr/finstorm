import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Category, Wallet, Transaction } from '../models/database.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public categories: Category[] = [];
  public wallets: Wallet[] = [];

  private CATEGORIES_STORAGE: string = 'categories';
  private TRANSACTIONS_STORAGE: string = 'transactions';
  private transactions: Transaction[] = [];
  private transactionsLastId: number = 0;
  private WALLETS_STORAGE: string = 'wallets';

  constructor() { }

  // получение по ключу  данных
  private async getKeyData(key: string) {
    let { value } = await Preferences.get({ key: key });
    return (value ? JSON.parse(value) : []);
  }

  private async setKeyData(key: string, data: object) {
    await Preferences.set({ key: key, value: JSON.stringify(data) });
    return data;
  }

  public getTransactions() {
    return this.transactions;
  }

  public async saveTransactions() {
    return this.setKeyData(this.TRANSACTIONS_STORAGE, { transactions: this.transactions, lastId: this.transactionsLastId });
  }

  public addTransaction(data: Transaction) {
    this.transactions.unshift({
      id: ++this.transactionsLastId,
      type: data.type || -1,
      date: data.date || (new Date()).toISOString(),
      name: data.name,
      sum: data.sum,
      categories: data.categories,
      // wallet: data.wallet
    });
  }

  public deleteTransaction(index: number) {
    this.transactions.splice(index, 1);
  }

  public async loadData() {
    this.categories = await this.getKeyData(this.CATEGORIES_STORAGE);
    this.wallets = await this.getKeyData(this.WALLETS_STORAGE);
    const transactionsObject = (await this.getKeyData(this.TRANSACTIONS_STORAGE));
    this.transactions = transactionsObject.transactions || [];
    this.transactionsLastId = transactionsObject.lastId;
  }

}
