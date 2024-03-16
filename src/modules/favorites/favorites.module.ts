import { Module, forwardRef } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { FavsController } from './favorites.controller';
import { FavsService } from './favorites.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [
    forwardRef(() => ArtistsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [FavsController],
  providers: [FavsService, TracksService, AlbumsService, ArtistsService],
  exports: [FavsService],
})
export class FavsModule {}
