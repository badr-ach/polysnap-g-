"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const pubsub_1 = require("@google-cloud/pubsub");
let AppService = class AppService {
    constructor() {
        this.pubsub = new pubsub_1.PubSub({
            projectId: 'poly-chat-400414',
            keyFilename: './poly-chat-400414-0e1e2e3f4f5a.json',
        });
    }
    async publishMessage(topicName, message) {
        const dataBuffer = Buffer.from(message);
        const sent = {
            data: dataBuffer,
        };
        try {
            const messageId = await this.pubsub
                .topic('projects/poly-chat-400414/topics/messaging_queue_topic')
                .publishMessage(sent);
            console.log(`Message ${messageId} published.`);
            console.log('Message published successfully.');
        }
        catch (error) {
            console.error('Error publishing message:', error);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map