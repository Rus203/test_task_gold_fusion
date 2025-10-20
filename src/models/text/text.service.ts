import { Injectable } from '@nestjs/common';
import { AIService } from '../ai/ai.service';
import { ParsedInfoInterface } from '../interfaces/parsed-info.interface';

@Injectable()
export class TextService {
  constructor(private readonly aiService: AIService) {}

  async classifyText(body: string): Promise<ParsedInfoInterface> {
    return this.aiService.classifyText(body);
  }
}
