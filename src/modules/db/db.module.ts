import { Global, Module } from '@nestjs/common';
import { DBService } from './db.service';

@Global()
@Module({
  // controllers: [DBController],
  providers: [DBService],
  exports: [DBService],
})
export class DBModule {}
