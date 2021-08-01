import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlightText',
})
export class HighlightTextPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }

    const regex = new RegExp(args, 'gi');
    const match = value.match(regex);

    if (!match) {
      return value;
    }

    const trustedContent = this.domSanitizer.bypassSecurityTrustHtml(
      value.replace(regex, `<span class="highlight">${match[0]}</span>`)
    );
    return trustedContent;
  }
}
