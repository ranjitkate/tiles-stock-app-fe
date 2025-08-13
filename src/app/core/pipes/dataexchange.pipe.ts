import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataexchange'
})
export class DataexchangePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
