import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

export interface Tag {
  name: string;
}

export interface Wallet {
  name: string;
}

export interface Transaction {
  // TODO: добавить id: как ууид или инкремент
  type: number, // тип - доход (1), расход (-1)
  date: Date; // дата транзакции
  name: string; // имя 
  sum: number; // сумма
  tags: Tag[]; // тэги (категории)
  // wallet: Wallet; // связанный кошелёк
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private TAG_STORAGE: string = 'tags';
  private WALLETS_STORAGE: string = 'wallets';
  private TRANSACTIONS_STORAGE: string = 'transactions';
 
  public tags: Tag[] = [];
  public wallets: Wallet[] = [];
  public transactions: Transaction[] = [];

  constructor() { }

  // получение по ключу  данных
  private async getKeyData(key: string) {
    let { value } = await Preferences.get({ key: key });
    return (value ? JSON.parse(value) : []);
  }

  public async addNewTransaction(data: Transaction) {
    this.transactions.unshift({
      type: data.type,
      date: data.date || new Date(),
      name: data.name,
      sum: data.sum,
      tags: data.tags,
      // wallet: data.wallet 
    });
  }

  public async loadData() {

    this.tags = await this.getKeyData(this.TAG_STORAGE);
    this.wallets = await this.getKeyData(this.WALLETS_STORAGE);
    this.transactions = await this.getKeyData(this.TRANSACTIONS_STORAGE);
  }

}
