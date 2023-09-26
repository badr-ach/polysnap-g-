import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { StoryDto } from '../dto/story.dto';
import {Story} from "../schema/story.schema";
import {CreateStoryDto} from "../dto/create-story.dto";

@Injectable()
export class StoriesService {
  private readonly logger = new Logger(StoriesService.name);

  constructor(private prisma: PrismaService) {}

  async searchStories(query: string): Promise<StoryDto[] | []> {
    this.logger.log(`Searching for stories with query ${query}`);
    return await this.prisma.user.findMany({
      where: {
        username: { contains: query },
      },
      take: 10,
      select: {
        _id: true,
        title: true,
        user: true,
        format: true,
        size: true,
        views: true,
        videoUrl: true,
      },
    });
  }

  async createStory(createStoryDto: CreateStoryDto): Promise<StoryDto> {
    this.logger.log(`Creating story ${JSON.stringify(createStoryDto)}`);
    const createdStory = await this.prisma.story.create({
      data: {
        title: createStoryDto.title,
        user: createStoryDto.user,
        format: createStoryDto.format,
        size: createStoryDto.size,
        videoUrl: createStoryDto.videoUrl,
      },
    });

    return createdStory;
  }



}
