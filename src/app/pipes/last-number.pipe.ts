import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastNumber'
})
export class LastNumberPipe implements PipeTransform {

  transform(value: number): number {
    const valueText = `${value}`;
    return +valueText[valueText.length - 1];
  }

}
