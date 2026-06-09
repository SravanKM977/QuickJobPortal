import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../core/services/company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-company-details',
  imports: [],
  templateUrl: './company-details.html',
  styleUrl: './company-details.css',
})
export class CompanyDetails {
  private route = inject(ActivatedRoute);
  private companyService = inject(CompanyService);
  company = signal<Company | null>(null);
  companyId!: string;

  constructor() {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.companyId = id;
      this.companyService.getCompanyById(this.companyId).subscribe((company) => {
        this.company.set(company);
      });
    }
  }
}
