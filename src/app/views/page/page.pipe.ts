import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashCase',
  standalone: true,
})
export class DashCase implements PipeTransform {
  transform(str: string): string {
    return DashCase.toDashCase(str);
  }

  static toDashCase(str: string): string {
    return str?.toLowerCase()
      .replaceAll(',', '')
      .replaceAll(':', '')
      .replaceAll('(', '')
      .replaceAll(')', '')
      .replaceAll('[', '')
      .replaceAll(']', '')
      .replaceAll('{', '')
      .replaceAll('}', '')
      .split(' ').join('-')
  }
}
