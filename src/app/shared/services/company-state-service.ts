import { Injectable, signal } from '@angular/core';
import { Company } from '../../features/company/models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyStateService {
  private companies = signal<Company[]>([]);
  selectedCompany = signal<Company | null>(null);

  constructor() {}

  setCompanies(companies: any) {
    this.companies.set(companies);
  }

  getCompanies() {
    return this.companies;
  }

  addCompany(company: Company) {
    this.companies.update((currentCompanies) => [...currentCompanies, company]);
  }

  updateCompany(updatedCompany: Company) {
    this.companies.update((currentCompanies) =>
      currentCompanies.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
  }

  deleteCompany(deleteCompany: Company) {
    this.companies.update((currentCompanies) =>
      currentCompanies.filter((company) => company.id !== deleteCompany.id)
    );
  }

  setSelectedCompany(company: Company) {
    this.selectedCompany.set(company);
  }
}
