import { Injectable } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';
import { KafkaService } from 'nestjs-kafka'; // Update the import
import * as avsc from 'avsc'; // Import avsc library

@Injectable()
export class AppService {
  private pubsub: PubSub;

  constructor() {
    this.pubsub = new PubSub({
      //projectId: 'poly-chat-400414',
      //keyFilename: 'poly-chat-400414-0e1e2e3f4f5a.json',
    });
  }

  async publishMessage(topicName: string, content: string): Promise<void> {
    try {
      // Create a message object with the specified Avro schema
      const messageData = {
        chatId: '123',
        sender: 'user1',
        content: content, // Specify content directly
        attachment: {
          type: 'image',
          name: 'example.jpg',
          link: 'https://example.com/example.jpg',
        },
        expiring: false,
      };

      // Publish the message
      const messageId = await this.pubsub
        .topic(topicName)
        .publishJSON(messageData);

      console.log(`Message ${messageId} published.`);
      console.log('Message published successfully.');
    } catch (error) {
      console.error('Error publishing message:', error);
    }
  }
}

