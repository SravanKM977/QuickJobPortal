import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Panel } from '../../../../shared/components/panel/panel';
import { CompanyService } from '../../../../core/services/company.service';
import { PageTitle } from '../../../../shared/components/page-title/page-title';
import { ButtonWrapper } from '../../../../shared/components/button-wrapper/button-wrapper';
import { FormStyleDirective } from '../../../../shared/directives/form-style-directive';
import { FormInputFontDirective } from '../../../../shared/directives/form-input-font-directive';
import { FormField } from '../../../../shared/components/form-field/form-field';
import { FieldType } from '../../../../shared/enum/field-type.enum';
import { DynamicField } from '../../../../shared/models/dynamic-field.interface';

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

  companyForm!: FormGroup;
  mode = 'add';
  pageTitle: string = 'Company Form';

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
      directive: 'alphabets',
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

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeCompanyForm();
  }

  initializeCompanyForm() {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      industry: ['', Validators.required],
      location: ['', Validators.required],
      website: ['', Validators.required],
      email: ['', [Validators.email, Validators.maxLength(20)]],
      phone: [''],
      employeeCount: [0],
      description: [''],
    });
  }

  submit() {
    if (this.companyForm.invalid) {
      this.companyForm.markAsTouched();
      console.log('submit invalid');
      return;
    } else {
      console.log('submit valid');
      if ((this.mode = 'add')) {
        this.addCompanies();
      } else if ((this.mode = 'edit')) {
        this.updateCompanies();
      }
    }
  }

  addCompanies() {
    const addCompany = this.companyForm.value;
    this.companyService.addCompanies(addCompany).subscribe(
      (res) => {
        if (res) {
          this.mode = 'add';
          this.router.navigate(['/layout/companies']);
        }
      },
      (error) => {
        console.error('error adding company', error);
      }
    );
  }

  updateCompanies() {
    const updateCompany = this.companyForm.value;
    this.companyService.updateCompanies(updateCompany).subscribe(
      (res) => {
        if (res) {
          this.mode = 'add';
          this.router.navigate(['/layout/companies']);
        }
      },
      (error) => {
        console.error('error updating company', error);
      }
    );
  }
}
