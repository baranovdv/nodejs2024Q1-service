import { Module } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { FavsController } from './favorites.controller';
import { FavsService } from './favorites.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Module({
  imports: [],
  controllers: [FavsController],
  providers: [FavsService, TracksService, AlbumsService, ArtistsService],
})
export class FavsModule {}
