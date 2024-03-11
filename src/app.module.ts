import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DBModule } from './modules/db/db.module';
import { TracksModule } from './modules/tracks/tracks.module';

@Module({
  imports: [UsersModule, TracksModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
