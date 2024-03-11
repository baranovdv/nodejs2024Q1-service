import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  imports: [TracksService],
  controllers: [ArtistsController],
  providers: [ArtistsService, TracksService],
})
export class ArtistsModule {}
