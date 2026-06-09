import { Component, inject, OnInit } from '@angular/core';
import { CompanyService } from '../../../../core/services/company.service';
import { Company } from '../../models/company.model';
import { CompanyStateService } from '../../../../shared/services/company-state-service';
import { Panel } from '../../../../shared/components/panel/panel';
import { PageTableTitle } from '../../../../shared/components/page-table-title/page-table-title';
import { SearchResults } from '../../../../shared/components/search-results/search-results';
import { DataTable } from '../../../../shared/components/data-table/data-table';
import { TableColumns } from '../../../../shared/models/table.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  imports: [Panel, PageTableTitle, SearchResults, DataTable],
  templateUrl: './company-list.html',
  styleUrl: './company-list.css',
})
export class CompanyList implements OnInit {
  private companyService = inject(CompanyService);
  private companyStateService = inject(CompanyStateService);

  companies = this.companyStateService.getCompanies();
  pageTableTitle: string = 'Companies';
  mode: string = 'add';

  companiesTableColumns: TableColumns[] = [
    { header: 'Name', field: 'name' },
    { header: 'Industry', field: 'industry' },
    { header: 'Location', field: 'location' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompanies().subscribe();
  }

  onAddCompany() {
    this.router.navigate(['/layout/companies/add']);
  }

  onSearchName(event: Event) {
    const input = (event.target as HTMLInputElement).value;
  }

  onEdit(company: Company) {
    this.mode = 'edit';
    this.router.navigate(['layout/companies/edit', company.id]);
  }

  onDelete(company: Company) {
    if (confirm('Are you sure you want to delete?')) {
      const deleteCompany = company;
      this.companyService.deleteCompanies(deleteCompany).subscribe(
        (response) => {
          this.loadCompanies();
        },
        (error) => {
          console.error('Error Deleting the Patient', company);
        }
      );
    } else {
      return;
    }
  }

  navigateToDetails(company: Company) {
    this.companyStateService.setSelectedCompany(company);
    this.router.navigate(['/layout/companies/details', company.id]);
  }
}
