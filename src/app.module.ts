import { Module } from '@nestjs/common';
import { TextModule } from './models/text/text.model';

@Module({
  imports: [TextModule],
})
export class AppModule {}
