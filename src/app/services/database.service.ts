import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Category, Wallet, Transaction } from '../models/database.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public wallets: Wallet[] = [];

  private CATEGORIES_STORAGE: string = 'categories';
  private categories: Category[] = [];
  private categoriesLastId: number = 0;

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

  public async loadData() {
    this.wallets = await this.getKeyData(this.WALLETS_STORAGE);

    const categoriesObject = (await this.getKeyData(this.CATEGORIES_STORAGE));
    this.categories = categoriesObject.categories || [];
    this.categoriesLastId = categoriesObject.lastId;

    const transactionsObject = (await this.getKeyData(this.TRANSACTIONS_STORAGE));
    this.transactions = transactionsObject.transactions || [];
    this.transactionsLastId = transactionsObject.lastId;
  }

  // категории
  public getCategories() {
    return this.categories;
  }

  public async saveCategories() {
    this.categories.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
    return this.setKeyData(this.CATEGORIES_STORAGE, { categories: this.categories.sort(), lastId: this.categoriesLastId });
  }

  public addCategory(data: Category) {
    this.categories.unshift({
      id: ++this.categoriesLastId,
      name: data.name,
//      children: []
    });
  }

  public deleteCategory(id: number) {
    let index = this.categories.findIndex((c) => c.id === id);
    this.categories.splice(index, 1);
  }


  // транзакции
  public getTransactions() {
    return this.transactions;
  }

  public async saveTransactions() {
    // возможно стоит сортировать это на другом этапе но без sql тут сложно что то выдумать пока что
    this.transactions.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
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

  public deleteTransaction(id: number) {
    let index = this.transactions.findIndex((c) => c.id === id);
    this.transactions.splice(index, 1);
  }



}
