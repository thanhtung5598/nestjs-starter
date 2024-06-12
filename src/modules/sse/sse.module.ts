import { Module } from '@nestjs/common';
import { SSEController } from 'src/controllers/sse/sse.controller';

@Module({
  controllers: [SSEController],
})
export class SSEModule {}
