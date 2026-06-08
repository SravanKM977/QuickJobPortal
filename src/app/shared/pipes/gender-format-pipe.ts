import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderFormat',
  standalone: true,
})
export class GenderFormatPipe implements PipeTransform {
  transform(gender: string): string {
    switch (gender) {
      case 'Male':
        return 'M';

      case 'Female':
        return 'F';

      case 'Other':
        return 'O';

      default:
        return gender;
    }
  }
}
