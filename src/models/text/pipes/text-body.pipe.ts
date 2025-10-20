import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class TextBodyPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new BadRequestException('Expected text/plain body');
    }
    return value.trim();
  }
}
