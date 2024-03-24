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
import { CreateArtistDto, UpdateArtistdDto } from './dto/artist.dto';
import { Artist } from '@prisma/client';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllArtists(): Promise<Artist[]> {
    return await this.artistsService.getAllArtists();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getOneArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return await this.artistsService.getOneArtist(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
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
