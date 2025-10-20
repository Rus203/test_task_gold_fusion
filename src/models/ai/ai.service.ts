import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIResponseInterface } from './ai.interfaces';
import { ParsedInfoInterface } from '../interfaces/parsed-info.interface';

@Injectable()
export class AIService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async classifyText(text: string): Promise<ParsedInfoInterface> {
    const prompt = this.getFullPrompt(text);
    const response = await this.makeRequest(prompt);

    const parsedInfo = JSON.parse(
      response.choices[0].message.content,
    ) as ParsedInfoInterface;

    return parsedInfo;
  }

  private async makeRequest(
    body: Record<string, any>,
  ): Promise<AIResponseInterface> {
    const apiKey: string = this.configService.get('OPENROUTER_KEY')!;

    const response = await this.httpService.axiosRef.post<AIResponseInterface>(
      'https://openrouter.ai/api/v1/chat/completions',
      body,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    return response.data;
  }

  private getFullPrompt(prompt: string) {
    return {
      stream: false,
      model: 'meta-llama/llama-4-maverick:free',
      messages: [
        {
          role: 'system',
          content:
            'Ты — классификатор текста. Нужно проанализировать текст и вернуть JSON с ключами zip, brand, category, time_pref. Если значение не найдено — ставь null в качестве значения. Верни только JSON без пояснений, комментариев и текста вокруг.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    };
  }
}
