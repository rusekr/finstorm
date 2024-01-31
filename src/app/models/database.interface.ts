export enum TransactionType {
  INCOME = 1,
  EXPENSE = -1
};

export interface Category {
  id: number;
//  parent: Category;
  name: string;
  children: Category[];
}

export interface Wallet {
  name: string;
}

export interface Transaction {
  id: number, // инкремент // TODO: хранить инкремент отдельно!! т.к. при удалении последдней транзакции он теряется
  type: TransactionType, // тип - доход (1), расход (-1)
  date: string; // дата транзакции в ISO формате
  name: string; // имя
  sum: number; // сумма
  categories: Category[]; // тэги (категории)
  // wallet: Wallet; // связанный кошелёк
}