import { Controller, Post,Get,Query, UploadedFile, UseInterceptors,Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { StorageService } from '../services/storage.service';

@Controller('storage')
export class StorageController {
  private readonly logger = new Logger(StorageController.name);

  constructor(private readonly storageService: StorageService) {}
   @Get('uploadUrl')
    async getUploadUrl(@Query('fileName') fileName: string): Promise<string> {
      try {
        const url = await this.storageService.generate(fileName);
        return url;
      } catch (error) {
        this.logger.log('Une erreur est survenue lors de la génération de l\'URL0',error);
      }
    }
}
