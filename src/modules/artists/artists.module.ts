import { Module, forwardRef } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { AlbumsService } from '../albums/albums.service';
import { FavsService } from '../favorites/favorites.service';
import { FavsModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [forwardRef(() => TracksModule), forwardRef(() => FavsModule)],
  controllers: [ArtistsController],
  providers: [ArtistsService, AlbumsService, FavsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
