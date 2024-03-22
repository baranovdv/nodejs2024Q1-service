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
import { ArtistsService } from './artists.service';
import { ArtistEntity } from '../db/entities/entities';
import { CreateArtistDto, UpdateArtistdDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllTracks(): Promise<ArtistEntity[]> {
    return await this.artistsService.getAllArtists();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getOneUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ArtistEntity> {
    return await this.artistsService.getOneArtist(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  create(@Body() createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistdDto,
  ) {
    return await this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistsService.deleteArtist(id);
  }
}
