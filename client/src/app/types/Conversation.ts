import { Message } from './Message';

export interface Conversation {
  ids: string[];
  messages: Message[];
}
