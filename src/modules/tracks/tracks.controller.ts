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
import { TrackEntity } from '../db/entities/track';
import { CreateTrackDto, UpdateTrackdDto } from './dto/track.dto';

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
  create(@Body() createUserDto: CreateTrackDto): TrackEntity {
    return this.tracksService.createTrack(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateTrackdDto,
  ) {
    return this.tracksService.updateTrack(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.deleteTrack(id);
  }
}
