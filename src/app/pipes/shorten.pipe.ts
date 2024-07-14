import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number, addEmoji: boolean) {
    if (value.length > limit) {
      const emoji: string = addEmoji ? '🖥️' : '';
      return value.substr(0, limit) + '... ' + emoji;
    }
    return value;
  }
}