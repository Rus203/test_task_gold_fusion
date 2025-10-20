import { Body, Controller, Get } from '@nestjs/common';
import { TextService } from './text.service';
import { ParsedInfoInterface } from '../interfaces/parsed-info.interface';

@Controller()
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Get('/classify')
  classifyText(@Body() text: string): Promise<ParsedInfoInterface> {
    return this.textService.classifyText(text);
  }
}
