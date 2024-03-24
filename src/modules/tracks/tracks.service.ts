import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { CreateTrackDto, UpdateTrackdDto } from './dto/track.dto';
import { Track } from '@prisma/client';

const NO_SUCH_ITEM = 'No such track';

@Injectable()
export class TracksService {
  constructor(private readonly dbService: DBService) {}

  async getAllTracks(): Promise<Track[]> {
    return await this.dbService.track.findMany();
  }

  async getOneTrack(id: string): Promise<Track> {
    const track = await this.dbService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return track;
  }

  async createTrack(dto: CreateTrackDto): Promise<Track> {
    const createdTrack = await this.dbService.track.create({
      data: dto,
    });

    return createdTrack;
  }

  async updateTrack(id: string, dto: UpdateTrackdDto): Promise<Track> {
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
