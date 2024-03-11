import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto, UpdateTrackdDto } from './dto/track.dto';
import { TrackEntity } from '../db/entities/entities';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAllTracks(): TrackEntity[] {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  getOneUser(@Param('id', ParseUUIDPipe) id: string): TrackEntity {
    return this.tracksService.getOneTrack(id);
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
