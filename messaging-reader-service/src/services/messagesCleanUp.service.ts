import { Injectable } from '@nestjs/common';
import { MessageService } from './messages.service';
import { Repository } from 'typeorm';
import { Chat } from 'src/entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity';
import { addMinutes } from 'date-fns';

@Injectable()
export class MessagesCleanUpService {
  constructor(
    private readonly messageService: MessageService,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async getChats(): Promise<Chat[]> {
    return this.chatRepository.find();
  }

  async getMessages(): Promise<Message[]> {
    return this.messageRepository.find();
  }

  async cleanUpMessages(): Promise<void> {
    const messages = await this.getMessages();
    for (const message of messages) {
      if (message.expiring) {
        if (message.expirationTime != null || message.expirationTime != 0) {
          const expirationDate = addMinutes(message.date, message.expirationTime);
          console.log('expirationDate ' + expirationDate);

          console.log('message id ' + message.id);
          const currentDate = new Date();
          console.log('currentDate ' + currentDate);
          if (currentDate >= expirationDate) {
            console.log('Deleting message ' + message.id);
            await this.messageService.deleteMessage(message.id);
          }
        } else {
          console.log('Deleting message SEEN  ' + message.id);
          this.cleanAllReadenMessages(message);
        }
      }
    }
  }

  async cleanAllReadenMessages(message: Message): Promise<void> {
    const participants = await this.getChatParticipantsByName(message.chatId);
    const seenBy = message.seenBy;
    if (seenBy.length === participants.length - 1) {
      console.log('Deleting message ' + message.id);
      await this.messageService.deleteMessage(message.id);
    }
  }

  async getChatParticipantsByName(chatId: number): Promise<number[]> {
    const chatEntity = await this.chatRepository.findOne({ where: { id: chatId } });
    return chatEntity.participants;
  }
}