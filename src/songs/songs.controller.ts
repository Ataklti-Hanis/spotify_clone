import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }
  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `fetch songs based on Id ${typeof id}`;
  }

  @Put(':id')
  update() {
    return 'update song based on id';
  }
  @Delete(':id')
  delete() {
    return 'delete songs based on id';
  }
}
