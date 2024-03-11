import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DBModule } from './modules/db/db.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { ArtistsModule } from './modules/artists/artists.module';
import { AlbumsModule } from './modules/albums/albums.module';

@Module({
  imports: [UsersModule, TracksModule, ArtistsModule, AlbumsModule, DBModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
