import { Injectable, signal } from '@angular/core';
import { Company } from '../../features/company/models/company.model';
import { apiEndPoints } from '../../../assets/constants/apiEndPoint.constant';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { CompanyStateService } from '../../shared/services/company-state-service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient, private companyStateService: CompanyStateService) {}

  getCompanies() {
    return this.http.get<Company[]>(apiEndPoints.companies).pipe(
      tap((res) => {
        this.companyStateService.setCompanies(res);
      }),
      catchError((error) => {
        return of([]);
      })
    );
  }

  addCompanies(company: Company) {
    return this.http.post<Company>(`${apiEndPoints.companies}`, company).pipe(
      tap((res) => {
        this.companyStateService.addCompany(res);
      }),
      catchError((error) => {
        return of([]);
      })
    );
  }

  updateCompanies(company: Company) {
    return this.http.put<Company>(`${apiEndPoints.companies}/${company.id}`, company).pipe(
      tap((res) => {
        this.companyStateService.updateCompany(res);
      }),
      catchError((error) => {
        return of([]);
      })
    );
  }

  deleteCompanies(company: Company) {
    return this.http.delete<Company>(`${apiEndPoints.companies}/${company.id}`).pipe(
      tap((res) => {
        this.companyStateService.deleteCompany(res);
      }),
      catchError((error) => {
        return of([]);
      })
    );
  }
}
