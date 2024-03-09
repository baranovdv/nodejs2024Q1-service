import { Global, Module } from '@nestjs/common';
import { DBController } from './db.controller';
import { DBService } from './db.service';

@Global()
@Module({
  controllers: [DBController],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
