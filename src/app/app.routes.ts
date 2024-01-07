import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'transaction-modal-popup',
    loadComponent: () => import('./transaction-modal-popup/transaction-modal-popup.page').then( m => m.TransactionModalPopupPage)
  },
];
