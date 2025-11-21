import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSpacer'
})
export class NumberSpacerPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) return '';

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  }

}

/* transform(value: number | string): string {
if (value === null || value === undefined) return '';
const num = typeof value === 'number' ? value : parseFloat(value.toString());
if (isNaN(num)) return '';
return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
} */
