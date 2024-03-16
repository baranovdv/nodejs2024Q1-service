import { Module, forwardRef } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { FavsModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [forwardRef(() => FavsModule), forwardRef(() => TracksModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
