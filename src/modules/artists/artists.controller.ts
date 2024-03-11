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
import { ArtistsService } from './artists.service';
import { ArtistEntity } from '../db/entities/entities';
import { CreateArtistDto, UpdateArtistdDto } from './dto/artist.dto';

const NO_SUCH_ITEM = 'No such artist';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getAllTracks(): ArtistEntity[] {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  getOneUser(@Param('id', ParseUUIDPipe) id: string): ArtistEntity {
    const artist = this.artistsService.getOneArtist(id);

    if (artist === undefined) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return artist;
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): ArtistEntity {
    return this.artistsService.createArtist(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistdDto,
  ) {
    return this.artistsService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.deleteArtist(id);
  }
}
