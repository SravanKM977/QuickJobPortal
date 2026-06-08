import { Routes } from '@angular/router';
import { MainLayout } from './layout/components/main-layout/main-layout';
import { CompanyList } from './features/company/components/company-list/company-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  },
  {
    path: 'layout',
    component: MainLayout,
    children: [
      {
        path: 'companies',
        loadChildren: () =>
          import('./features/company/company-module').then((m) => m.CompanyModule),
      },
    ],
  },
];
