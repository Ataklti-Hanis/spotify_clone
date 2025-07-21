import { IsOptional } from 'class-validator';
import { Artist } from 'src/artist/artist-entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('song')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  // @Column('varchar', { array: true })
  // artists: string[];

  @Column('date')
  releaseDate: Date;

  @Column('time')
  duration: Date;

  @Column()
  @IsOptional()
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'artist_song' })
  artists: Artist[];
}
