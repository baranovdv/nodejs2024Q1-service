import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto, UpdateTrackdDto } from './dto/track.dto';
import { TrackEntity } from '../db/entities/entities';

const NO_SUCH_ITEM = 'No such track';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAllTracks(): TrackEntity[] {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  getOneUser(@Param('id', ParseUUIDPipe) id: string): TrackEntity {
    const track = this.tracksService.getOneTrack(id);

    if (track === undefined) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return track;
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto): TrackEntity {
    return this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackdDto,
  ) {
    return this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.deleteTrack(id);
  }
}
