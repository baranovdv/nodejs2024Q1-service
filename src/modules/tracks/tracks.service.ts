import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { CreateTrackDto, UpdateTrackdDto } from './dto/track.dto';
import { DBFieldsWithId } from 'src/data/types';
import { TrackEntity } from '../db/entities/entities';

const ITEM_TYPE: DBFieldsWithId = 'tracks';
const NO_SUCH_ITEM = 'No such track';

@Injectable()
export class TracksService {
  constructor(private readonly dbService: DBService) {}

  getAllTracks(): TrackEntity[] {
    return this.dbService.getAll(ITEM_TYPE);
  }

  getOneTrack(id: string): TrackEntity | undefined {
    return this.dbService.getOne(ITEM_TYPE, id) as TrackEntity | undefined;
  }

  createTrack(dto: CreateTrackDto): TrackEntity {
    const newTrack: TrackEntity = {
      id: uuidv4(),
      ...dto,
    };

    this.dbService.create(ITEM_TYPE, newTrack);

    return newTrack;
  }

  updateTrack(id: string, dto: UpdateTrackdDto): TrackEntity {
    let track = this.getOneTrack(id);

    track = {
      ...track,
      ...dto,
    };

    const updateResult = this.dbService.update(ITEM_TYPE, id, track);

    if (!updateResult) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return track;
  }

  deleteTrack(id: string): void {
    const deleteResult = this.dbService.delete(ITEM_TYPE, id);

    if (!deleteResult) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }
  }

  nullArtistIdInTrackByArtistId(id: string): void {
    const tracks = this.getAllTracks();

    const track = tracks.find((track) => track.artistId === id);

    if (!track) return;

    this.updateTrack(track.id, {
      ...track,
      artistId: null,
    });
  }

  nullAlbumIdInTrackByArtistId(id: string): void {
    const tracks = this.getAllTracks();

    const track = tracks.find((track) => track.albumId === id);

    if (!track) return;

    this.updateTrack(track.id, {
      ...track,
      albumId: null,
    });
  }
}
