import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MultiplierByTwoPipe'
})
export class MultiplierByTwoPipe implements PipeTransform {
  transform(value: number): number {
    return value * 2;
  }
}
