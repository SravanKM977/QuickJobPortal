import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AlphabetsOnlyDirective } from '../../directives/alphabets-only-directive';
import { NoAlphabetsDirective } from '../../directives/no-alphabets-directive';
import { DynamicField } from '../../models/dynamic-field.interface';

@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule, AlphabetsOnlyDirective, NoAlphabetsDirective],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
})
export class FormField {
  @Input() fields!: DynamicField[];

  @Input() companyForm!: FormGroup;

  constructor() {}

  getControl(name: string): FormControl {
    return this.companyForm.get(name) as FormControl;
  }
}
