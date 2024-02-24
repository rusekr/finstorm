import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'reports',
        loadComponent: () =>
          import('../reports/reports.page').then((m) => m.ReportsPage),
      },
      {
        path: 'journal',
        loadComponent: () =>
          import('../journal/journal.page').then((m) => m.JournalPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/reports',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/reports',
    pathMatch: 'full',
  },
];
