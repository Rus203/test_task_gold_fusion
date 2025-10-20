import { Body, Controller, Get, UsePipes } from '@nestjs/common';
import { TextService } from './text.service';
import { ParsedInfoInterface } from '../interfaces/parsed-info.interface';
import { TextBodyPipe } from './pipes/text-body.pipe';

@Controller()
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Get('/classify')
  @UsePipes(new TextBodyPipe())
  classifyText(@Body() text: string): Promise<ParsedInfoInterface> {
    return this.textService.classifyText(text);
  }
}
