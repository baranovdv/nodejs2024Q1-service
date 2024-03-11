import { Module } from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  imports: [TracksService],
  controllers: [AlbumsController],
  providers: [AlbumsService, TracksService],
})
export class AlbumsModule {}
