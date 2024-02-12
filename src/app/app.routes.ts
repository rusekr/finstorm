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
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories.page').then( m => m.CategoriesPage)
  },
  {
    path: 'category-modal-popup',
    loadComponent: () => import('./category-modal-popup/category-modal-popup.page').then( m => m.CategoryModalPopupPage)
  },
];
