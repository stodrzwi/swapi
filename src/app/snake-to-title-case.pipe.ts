import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakeToTitleCase'
})
export class SnakeToTitleCasePipe implements PipeTransform {

  transform(value: string): string {
    // Replace underscores with spaces and capitalize first letter of each word
    return value.replace(/_/g, ' ').replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
  }

}
