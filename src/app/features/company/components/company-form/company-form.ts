import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Panel } from '../../../../shared/components/panel/panel';
import { CompanyService } from '../../../../core/services/company.service';
import { PageTitle } from '../../../../shared/components/page-title/page-title';
import { ButtonWrapper } from '../../../../shared/components/button-wrapper/button-wrapper';
import { FormStyleDirective } from '../../../../shared/directives/form-style-directive';
import { FormInputFontDirective } from '../../../../shared/directives/form-input-font-directive';
import { FormField } from '../../../../shared/components/form-field/form-field';
import { FieldType } from '../../../../shared/enum/field-type.enum';
import { DynamicField } from '../../../../shared/models/dynamic-field.interface';
import { Company } from '../../models/company.model';
import { exhaustMap, Subject } from 'rxjs';

@Component({
  selector: 'app-company-form',
  imports: [
    Panel,
    PageTitle,
    ReactiveFormsModule,
    ButtonWrapper,
    FormStyleDirective,
    FormInputFontDirective,
    FormField,
  ],
  templateUrl: './company-form.html',
  styleUrl: './company-form.css',
})
export class CompanyForm {
  private companyService = inject(CompanyService);
  private route = inject(ActivatedRoute);

  companyForm!: FormGroup;
  mode = 'add';
  pageTitle: string = 'Company Form';
  companyId!: string;

  fields: DynamicField[] = [
    {
      label: 'Name',
      controlName: 'name',
      fieldType: FieldType.TEXT,
      title: 'name',
      for: 'name',
      id: 'name',
      placeholder: 'Enter Company name',
      directive: 'alphabets',
    },
    {
      label: 'Industry',
      controlName: 'industry',
      fieldType: FieldType.TEXT,
      title: 'industry',
      for: 'industry',
      id: 'industry',
      placeholder: 'Enter Company industry',
      directive: 'alphabets',
    },
    {
      label: 'Location',
      controlName: 'location',
      fieldType: FieldType.TEXT,
      title: 'location',
      for: 'location',
      id: 'location',
      placeholder: 'Enter Company location',
      directive: 'alphabets',
    },
    {
      label: 'Email',
      controlName: 'email',
      fieldType: FieldType.EMAIL,
      title: 'email',
      for: 'email',
      id: 'email',
      placeholder: 'Enter Company email',
      directive: 'none',
    },
    {
      label: 'Phone',
      controlName: 'phone',
      fieldType: FieldType.PHONE,
      title: 'phone',
      for: 'phone',
      id: 'phone',
      placeholder: 'Enter phone number',
      directive: 'numbers',
    },
    {
      label: 'Employee Count',
      controlName: 'employeeCount',
      fieldType: FieldType.TEXT,
      title: 'employeeCount',
      for: 'employeeCount',
      id: 'employeeCount',
      placeholder: 'Enter employee count',
      directive: 'numbers',
    },
  ];

  private submit$ = new Subject<void>();

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeCompanyForm();
    this.patchForm();
  }

  initializeCompanyForm() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      industry: ['', Validators.required],
      location: ['', Validators.required],
      website: [''],
      email: ['', [Validators.email, Validators.maxLength(40)]],
      phone: [''],
      employeeCount: [0],
      description: [''],
    });
  }

  patchForm() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.companyId = id;
      this.mode = 'edit';
      this.loadCompany(this.companyId);
    }
  }

  loadCompany(id: string) {
    this.companyService.getCompanyById(id).subscribe((res) => {
      this.companyForm.patchValue(res!);
    });
  }

  onCancel() {
    this.goToCompaniesList();
  }

  goToCompaniesList() {
    this.mode = 'add';
    this.companyForm.markAsUntouched();
    this.companyForm.reset();
    this.router.navigate(['layout/companies']);
  }

  submit() {
    if (this.companyForm.invalid) {
      Object.keys(this.companyForm.controls).forEach((key) => {
        const control = this.companyForm.get(key);

        console.log(key, 'valid:', control?.valid, 'errors:', control?.errors);
      });
      this.companyForm.markAllAsTouched();
      console.log('submit invalid');
      return;
    } else {
      console.log('submit valid');
      if (this.mode === 'add') {
        this.addCompanies();
      } else if (this.mode === 'edit') {
        this.updateCompanies();
      }
      this.submit$.next();
    }
  }

  addCompanies() {
    const addCompany: Company = {
      ...this.companyForm.getRawValue(),
      id: this.companyId,
    };
    this.companyService.addCompanies(addCompany).subscribe({
      next: () => this.goToCompaniesList(),
      error: (error) => console.error(error),
    });
  }

  updateCompanies() {
    this.submit$
      .pipe(
        exhaustMap(() => {
          const updateCompany: Company = {
            ...this.companyForm.getRawValue(),
            id: this.companyId,
          };

          return this.companyService.addCompanies(updateCompany);
        })
      )
      .subscribe({
        next: () => this.goToCompaniesList(),
        error: (error) => console.error(error),
      });
  }
}
