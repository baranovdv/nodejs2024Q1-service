import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
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
  @Header('Content-Type', 'application/json')
  async getAllTracks(): Promise<TrackEntity[]> {
    return await this.tracksService.getAllTracks();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getOneUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<TrackEntity> {
    return await this.tracksService.getOneTrack(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body() createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    return await this.tracksService.createTrack(createTrackDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackdDto,
  ): Promise<TrackEntity> {
    return await this.tracksService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.tracksService.deleteTrack(id);
  }
}
