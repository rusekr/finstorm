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
  id: number, // инкремент // TODO: хранить инкремент отдельно!! т.к. при удалении последдней транзакции он теряется
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

  private async setKeyData(key: string, data: any[]) {
    await Preferences.set({ key: key, value: JSON.stringify(data) });
    return data;
  }

  public async saveTransactions() {
    return this.setKeyData(this.TRANSACTIONS_STORAGE, this.transactions);
  }

  public addTransaction(data: Transaction) {
    const lastElement = this.transactions[this.transactions.length-1];
    const lastIndex = lastElement && this.transactions[this.transactions.length-1].id || 0; // TODO: хранить инкремент отдельно!! т.к. при удалении последдней транзакции он теряется
    this.transactions.unshift({
      id: lastIndex + 1,
      type: data.type || -1,
      date: data.date || new Date(),
      name: data.name,
      sum: data.sum,
      tags: data.tags,
      // wallet: data.wallet 
    });
  }

  public deleteTransaction(index: number) {
    this.transactions.splice(index, 1);
  }

  public async loadData() {

    this.tags = await this.getKeyData(this.TAG_STORAGE);
    this.wallets = await this.getKeyData(this.WALLETS_STORAGE);
    this.transactions = (await this.getKeyData(this.TRANSACTIONS_STORAGE)).map((t: any) => {
      t.date = new Date(t.date);
      return t;
    });
  }

}
