import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Song } from './song.entity';
import { promises } from 'dns';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDto);
  }
  @Get()
  findAll(): Promise<Song[]> {
    try {
      return this.songsService.findAll();
    } catch (err) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: err,
        },
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    const song = await this.songsService.findOne(id);

    if (!song) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }
    return song;
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSong: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSong);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    const songToDelete = await this.songsService.remove(id);

    if (songToDelete.affected === 0) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }

    return songToDelete;
  }
}
