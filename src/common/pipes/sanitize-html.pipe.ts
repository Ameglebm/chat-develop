import {
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizeHtmlPipe
  implements PipeTransform
{
  transform(value: string): string {
    if (typeof value !== 'string') {
      return value;
    }

    return sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
}

