import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { CreateTrackDto, UpdateTrackdDto } from './dto/track.dto';
import { TrackEntity } from '../db/entities/entities';

const NO_SUCH_ITEM = 'No such track';

@Injectable()
export class TracksService {
  constructor(private readonly dbService: DBService) {}

  async getAllTracks(): Promise<TrackEntity[]> {
    return await this.dbService.track.findMany();
  }

  async getOneTrack(id: string): Promise<TrackEntity> {
    const track = await this.dbService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return track;
  }

  async createTrack(dto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = {
      id: uuidv4(),
      ...dto,
    };

    const createdTrack = await this.dbService.track.create({
      data: newTrack,
    });

    return createdTrack;
  }

  async updateTrack(id: string, dto: UpdateTrackdDto): Promise<TrackEntity> {
    let track = await this.dbService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    track = {
      ...track,
      ...dto,
    };

    const updatedTrack = await this.dbService.track.update({
      where: { id },
      data: track,
    });

    if (!updatedTrack) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return updatedTrack;
  }

  async deleteTrack(id: string): Promise<void> {
    try {
      await this.dbService.track.delete({ where: { id } });
    } catch {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    // this.dbService.deleteFav('track', id);
  }
}
