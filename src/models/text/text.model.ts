import { Module } from '@nestjs/common';
import { TextController } from './text.controller';
import { TextService } from './text.service';
import { AIModule } from '../ai/ai.modul';

@Module({
  imports: [AIModule],
  controllers: [TextController],
  providers: [TextService],
})
export class TextModule {}
