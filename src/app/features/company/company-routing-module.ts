import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyForm } from './components/company-form/company-form';
import { CompanyList } from './components/company-list/company-list';
import { CompanyDetails } from './components/company-details/company-details';

const companyRoutes: Routes = [
  {
    path: '',
    component: CompanyList,
  },
  {
    path: 'add',
    component: CompanyForm,
  },
  {
    path: 'edit/:id',
    component: CompanyForm,
  },
  {
    path: 'details',
    component: CompanyDetails,
  },
  {
    path: 'details/:id',
    component: CompanyDetails,
  },
];

@NgModule({
  imports: [RouterModule.forChild(companyRoutes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
